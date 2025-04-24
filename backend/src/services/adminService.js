const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const logger = require('../utils/logger');

const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret';

const login = async (email, username, password) => {
  const [admins] = await adminModel.findAdminByEmailAndUsername(email, username);

  if (admins.length === 0) throw new Error('Admin non trouvé');
  const admin = admins[0];

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) throw new Error('Mot de passe incorrect');

  const token = jwt.sign(
    {
      username: admin.username,
      email: admin.email,
      idAdminAccount: admin.idAdminAccount
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  // Journalisation
  logger.logAdminLogin(admin.username);

  return {
    token,
    admin: {
      username: admin.username,
      email: admin.email,
      idAdminAccount: admin.idAdminAccount
    }
  };
};

module.exports = { login };
