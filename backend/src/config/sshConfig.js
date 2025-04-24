// config/sshConfig.js
const fs = require('fs');

const SSH_USER = process.env.SSH_USER;
const SSH_PRIVATE_KEY_PATH = process.env.SSH_PRIVATE_KEY_PATH;

if (!SSH_USER || !SSH_PRIVATE_KEY_PATH) {
    console.error("SSH_USER or SSH_PRIVATE_KEY_PATH is not defined.");
    process.exit(1);
}

let privateKey;
try {
    privateKey = fs.readFileSync(SSH_PRIVATE_KEY_PATH, 'utf8');
} catch (err) {
    console.error(`Failed to read SSH key: ${err.message}`);
    process.exit(1);
}

module.exports = {
    SSH_USER,
    privateKey
};
