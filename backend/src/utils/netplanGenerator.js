// utils/netplanGenerator.js
const yaml = require('js-yaml');

function generateNetplanConfig(vmConfig, newIpWithMask) {
    const config = {
        network: {
            version: 2,
            ethernets: {}
        }
    };

    config.network.ethernets[vmConfig.interface_to_change] = {
        dhcp4: false,
        addresses: [newIpWithMask]
    };

    if (vmConfig.management_interface_name && vmConfig.management_interface_config) {
        const mgmt = {};
        const addrMatch = vmConfig.management_interface_config.match(/addresses:\s*\[([^\]]+)\]/);
        if (addrMatch && addrMatch[1]) mgmt.addresses = [addrMatch[1].trim()];
        mgmt.dhcp4 = false;
        config.network.ethernets[vmConfig.management_interface_name] = mgmt;
    }

    if (vmConfig.other_interfaces) {
        for (const iface in vmConfig.other_interfaces) {
            const cfg = {};
            const addrMatch = vmConfig.other_interfaces[iface].match(/addresses:\s*\[([^\]]+)\]/);
            if (addrMatch && addrMatch[1]) cfg.addresses = [addrMatch[1].trim()];
            cfg.dhcp4 = false;
            config.network.ethernets[iface] = cfg;
        }
    }

    return yaml.dump(config, { indent: 2 });
}

module.exports = { generateNetplanConfig };
