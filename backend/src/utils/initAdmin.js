// src/utils/initAdmin.js
const radiusDB = require('../models/db');
const bcrypt = require('bcrypt');

const insertAdmin = async () => {
  const email = 'momo@gmail.com';
  const username = 'momo';
  const plainPassword = 'momo';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const [rows] = await radiusDB.query('INSERT INTO AdminAccount (creation_date) VALUES (NOW())');
  const idAdminAccount = rows.insertId;

  await radiusDB.query(
    'INSERT INTO Admin (username, email, password, idAdminAccount) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, idAdminAccount]
  );

  console.log('✅ Admin créé avec succès');
};

insertAdmin();
