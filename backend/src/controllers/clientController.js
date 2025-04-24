const clientService = require('../services/clientService');

exports.create = async (req, res) => {
  try {
    console.log('📥 Requête reçue pour création de client :', req.body); // ← ici
    const newClient = await clientService.createClient(req.body);
    console.log('✅ Client créé avec succès :', newClient); // ← ici
    res.status(201).json(newClient);
  } catch (err) {
    console.error('❌ Erreur lors de la création du client :', err); // ← ici
    res.status(500).json({ error: err.message });
  }
};


exports.read = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client introuvable' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await clientService.updateClient(req.params.id, req.body);
    res.status(200).json({ message: 'Client mis à jour.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await clientService.deleteClient(req.params.id);
    res.status(200).json({ message: 'Client supprimé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setLimit = async (req, res) => {
  try {
    await clientService.setClientDataLimit(req.params.id, req.body.data_limit);
    res.status(200).json({ message: 'Limite de données mise à jour.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.disable = async (req, res) => {
  try {
    await clientService.disableClient(req.params.id);
    res.status(200).json({ message: 'Client désactivé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await clientService.forceLogout(req.params.username);
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/clientController.js

exports.getLogs = async (req, res) => {
  try {
    const logs = await clientService.getClientLogs(req.params.id);

    // Désactiver le cache
    res.set('Cache-Control', 'no-store');

    if (!logs.sessions || logs.sessions.length === 0) {
      return res.status(200).json({
        message: 'Aucune session trouvée pour ce client.',
        client: logs.client,
        username: logs.username,
        sessions: [],
      });
    }

    res.status(200).json(logs);
  } catch (err) {
    console.error("Erreur dans getLogs :", err.message);
    res.status(500).json({ error: "Erreur lors de la récupération des logs : " + err.message });
  }
};


exports.enable = async (req, res) => {
  try {
    await clientService.enableClient(req.params.id);
    res.status(200).json({ message: 'Client réactivé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
