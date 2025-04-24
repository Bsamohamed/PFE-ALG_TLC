const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../../logs/admin_logins.log');

const logAdminLogin = (username) => {
  const date = new Date().toISOString();
  const log = `[${date}] Admin login: ${username}\n`;
  fs.appendFileSync(logPath, log);
};

module.exports = {
  logAdminLogin
};
