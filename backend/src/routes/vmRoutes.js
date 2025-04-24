// routes/vmRoutes.js
const express = require('express');
const router = express.Router();
const { updateVmIp, VMS } = require('../services/vmService');

const IP_PREFIX = '172.20';
const IP_MASK   = '/24';

router.get('/status', (req, res) => {
    const status = VMS.map(({ id, management_ip, assigned_ip, assigned_gateway, status, last_check }) => ({
        id, management_ip, assigned_ip, assigned_gateway, status, last_check
    }));
    res.json(status);
});

router.post('/:id/ip', async (req, res) => {
    const { id } = req.params;
    const { gateway, host } = req.body;

    if (![1, 2, 3].includes(gateway)) return res.status(400).json({ success: false, message: 'Invalid gateway' });
    if (!Number.isInteger(host) || host < 1 || host > 254) return res.status(400).json({ success: false, message: 'Invalid host' });

    const newIp = `${IP_PREFIX}.${gateway}.${host}${IP_MASK}`;
    const vm = VMS.find(v => v.id === id);
    if (!vm) return res.status(404).json({ success: false, message: 'VM not found' });

    const result = await updateVmIp(vm, newIp);
    res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
