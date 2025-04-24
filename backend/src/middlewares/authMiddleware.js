const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer token

  if (!token) return res.status(401).json({ error: 'Token manquant' });

  jwt.verify(token, SECRET_KEY, (err, admin) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.admin = admin;
    next();
  });
};

module.exports = { authenticateToken };
