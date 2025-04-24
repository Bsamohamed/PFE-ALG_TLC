const gatewayService = require('../services/gatewayService');

exports.getAvailableGateways = async (req, res) => {
  try {
    const gateways = await gatewayService.fetchGatewaysStatus();
    res.status(200).json(gateways);
  } catch (error) {
    console.error('Error fetching gateways:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
