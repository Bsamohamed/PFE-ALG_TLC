const db = require('./db');

const findAdminByEmailAndUsername = (email, username) => {
  return db.query('SELECT * FROM Admin WHERE email = ? AND username = ?', [email, username]);
};

module.exports = {
  findAdminByEmailAndUsername
};
