const db = require('../models/db');

exports.createClient = async (data) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [accountResult] = await conn.query(
      `INSERT INTO ClientAccount (data_limit, logs, begin_usage_date, end_usage_date)
       VALUES (?, ?, ?, ?)`,
      [data.data_limit, '', data.begin_usage_date, data.end_usage_date]
    );
    const idClientAccount = accountResult.insertId;

    const [clientResult] = await conn.query(
      `INSERT INTO Client (nom, email, password, creation_date, end_date, idClientAccount)
       VALUES (?, ?, ?, NOW(), ?, ?)`,
      [data.nom, data.email, data.password, data.end_usage_date, idClientAccount]
    );
    const idClient = clientResult.insertId;

    await conn.query(
      `INSERT INTO radcheck (username, attribute, op, value, idClient)
       VALUES (?, 'Cleartext-Password', ':=', ?, ?)`,
      [data.email, data.password, idClient]
    );


    console.log("Adresse IP reçue :", data.ip_address);

    await conn.query(
      `INSERT INTO radreply (username, attribute, op, value)
       VALUES (?, 'Framed-IP-Address', '=', ?)`,
      [data.email, data.ip_address]
    );
    

    await conn.commit();

    return {
      idClient,
      nom: data.nom,
      email: data.email,
      creation_date: new Date().toISOString(),
      end_date: data.end_usage_date,
      begin_usage_date: data.begin_usage_date,
      data_limit: data.data_limit
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.getClients = async () => {
  const [rows] = await db.query(`
    SELECT c.idClient, c.nom, c.email, c.password, 
           ca.begin_usage_date, ca.end_usage_date, 
           r.value AS ip_address
    FROM Client c
    JOIN ClientAccount ca ON c.idClientAccount = ca.idClientAccount
    LEFT JOIN radreply r ON c.email = r.username AND r.attribute = 'Framed-IP-Address'
  `);
  return rows;
};

exports.getClientById = async (idClient) => {
  const [rows] = await db.query(`
    SELECT c.idClient, c.nom, c.email, c.password, c.creation_date, c.end_date,
           ca.begin_usage_date, ca.end_usage_date,
           r.value AS ip_address
    FROM Client c 
    LEFT JOIN ClientAccount ca ON c.idClientAccount = ca.idClientAccount 
    LEFT JOIN radreply r ON c.email = r.username AND r.attribute = 'Framed-IP-Address'
    WHERE c.idClient = ?
  `, [idClient]);

  return rows[0] || null;
};


exports.updateClient = async (idClient, data) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [[client]] = await conn.query(
      `SELECT idClientAccount, password, email FROM Client WHERE idClient = ?`,
      [idClient]
    );

    if (!client) throw new Error('Client introuvable');

    const newPassword = data.password && data.password.trim() !== "" ? data.password : client.password;

    await conn.query(
      `UPDATE Client 
       SET nom = ?, email = ?, password = ?, end_date = ?
       WHERE idClient = ?`,
      [data.nom, data.email, newPassword, data.end_usage_date, idClient]
    );

    await conn.query(
      `UPDATE ClientAccount 
       SET begin_usage_date = ?, end_usage_date = ?
       WHERE idClientAccount = ?`,
      [data.begin_usage_date, data.end_usage_date, client.idClientAccount]
    );

    await conn.query(
      `UPDATE radcheck 
       SET username = ?, value = ? 
       WHERE idClient = ? `,
      [data.email, newPassword, idClient]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};




exports.deleteClient = async (idClient) => {
  try {
    // Étape 1 : Récupérer l'email du client
    const [rows] = await db.query(`SELECT email FROM Client WHERE idClient = ?`, [idClient]);
    
    if (rows.length === 0) {
      console.error(`Client with id ${idClient} not found.`);
      throw new Error("Client not found.");
    }

    const client = rows[0];
    
    if (!client.email) {
      console.error(`Client with id ${idClient} has no email.`);
      throw new Error("Client email missing.");
    }
    
    const emailClient = client.email;
    console.log(`Attempting to delete client with email: ${emailClient}`);

    // Étape 2 : Supprimer les entrées associées
    await db.query(`DELETE FROM radcheck WHERE username = ?`, [emailClient]);
    await db.query(`DELETE FROM radreply WHERE username = ?`, [emailClient]);

    // Étape 3 : Supprimer le client
    await db.query(`DELETE FROM Client WHERE idClient = ?`, [idClient]);
    await db.query(`DELETE FROM ClientAccount WHERE idClientAccount = ?`, [idClient]);

    console.log(`Client ${emailClient} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting client ${idClient}:`, error.message);
    throw error;
  }
};





//desactiver compte client

exports.disableClient = async (idClient) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [[client]] = await conn.query(
      `SELECT email, idClientAccount FROM Client WHERE idClient = ?`, [idClient]
    );

    if (!client) throw new Error('Client introuvable');

    const email = client.email;

    // 1. Changer la password dans radcheck pour bloquer la connexion (optionnel mais sûr)
    await conn.query(
      `UPDATE radcheck SET value = 'account_disabled' WHERE username = ?`,
      [email]
    );

    // 2. Mettre à jour l'état du compte (logique métier)
    await conn.query(
      `UPDATE ClientAccount SET end_usage_date = NOW() WHERE idClientAccount = ?`,
      [client.idClientAccount]
    );

    // 3. Ajouter une entrée dans la table radreply (rejet systématique) (optionnel mais top)
    await conn.query(`
      INSERT INTO radreply (username, attribute, op, value)
      VALUES (?, 'Auth-Type', ':=', 'Reject')
      ON DUPLICATE KEY UPDATE value = 'Reject'
    `, [email]);

    await conn.commit();

    // 4. Si connecté → tenter de forcer la déconnexion (CoA ou script système)
    // await execScriptToDisconnectUser(email); // À créer

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};





//activer le compte client

exports.enableClient = async (idClient) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Récupérer les infos du client
    const [[client]] = await conn.query(
      `SELECT email, password, idClientAccount FROM Client WHERE idClient = ?`,
      [idClient]
    );
    if (!client) throw new Error("Client introuvable");

    const email = client.email;
    const password = client.password;

    // 2. Restaurer le mot de passe dans radcheck
    await conn.query(
      `UPDATE radcheck SET value = ? WHERE username = ?`,
      [password, email]
    );

    // 3. Optionnel : prolonger l'abonnement (ex: +30 jours) ou fixer une nouvelle date future
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1); // +1 mois

    await conn.query(
      `UPDATE ClientAccount SET end_usage_date = ? WHERE idClientAccount = ?`,
      [futureDate, client.idClientAccount]
    );

    // 4. Supprimer l'entrée de blocage radreply s'il y en a une
    await conn.query(
      `DELETE FROM radreply WHERE username = ? AND attribute = 'Auth-Type' AND value = 'Reject'`,
      [email]
    );

    await conn.commit();

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};



exports.getClientLogs = async (idClient) => {
  // 1. Obtenir l'email du client (utilisé comme username dans radacct)
  const [[client]] = await db.query(`
    SELECT email, nom FROM Client WHERE idClient = ?
  `, [idClient]);

  if (!client) throw new Error("Client introuvable");

  // 2. Récupérer tous les logs avec tous les attributs de radacct
  const [logs] = await db.query(`
    SELECT *
    FROM radacct
    WHERE username = ?
    ORDER BY acctstarttime DESC
  `, [client.email]);

  return {
    client: client.nom,
    username: client.email,
    sessions: logs
  };
};




exports.forceLogout = async (username) => {
  // À implémenter : logique de déconnexion via FreeRADIUS ou script externe
};


