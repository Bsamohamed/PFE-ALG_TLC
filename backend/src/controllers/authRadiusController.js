const { authenticateUser } = require('../services/radiusService');

exports.loginRadius = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {
      res.status(200).json({ message: 'RADIUS Authentication successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials via RADIUS' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error communicating with RADIUS server' });
  }
};
