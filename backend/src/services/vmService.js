// services/vmService.js
const { NodeSSH } = require('node-ssh');
const { generateNetplanConfig } = require('../utils/netplanGenerator');
const { SSH_USER, privateKey } = require('../config/sshConfig');
const VMS = require('../vms.json');

const netplanFilePath = '/etc/netplan/50-cloud-init.yaml';

async function updateVmIp(vmConfig, newIpWithMask) {
    const ssh = new NodeSSH();
    try {
        await ssh.connect({
            host: vmConfig.management_ip,
            username: SSH_USER,
            privateKey,
            tryKeyboard: false,
            connectionTimeout: 10000,
        });

        const netplanContent = generateNetplanConfig(vmConfig, newIpWithMask);
        const writeCommand = `echo '${netplanContent.replace(/'/g, "'\\''")}' | sudo tee ${netplanFilePath}`;
        const resultWrite = await ssh.execCommand(writeCommand);
        if (resultWrite.code !== 0) throw new Error(resultWrite.stderr);

        const resultApply = await ssh.execCommand('sudo netplan apply');
        if (resultApply.code !== 0) throw new Error(resultApply.stderr);

        return { success: true, message: `IP updated for ${vmConfig.id}` };
    } catch (err) {
        return { success: false, message: `Error: ${err.message}` };
    } finally {
        ssh.dispose();
    }
}

async function checkVmHealth() {
    const checks = VMS.map(async (vm, i) => {
        const ssh = new NodeSSH();
        try {
            await ssh.connect({
                host: vm.management_ip,
                username: SSH_USER,
                privateKey,
                tryKeyboard: false,
                connectionTimeout: 5000,
            });

            VMS[i].status = 'REACHABLE';
            const res = await ssh.execCommand("ip -4 addr show enp0s8 | grep 'inet ' | awk '{print $2}'");
            const ip = res.stdout.trim();
            VMS[i].assigned_ip = ip || 'unknown';
            VMS[i].assigned_gateway = ip ? `gateway ${ip.split('.')[2]}` : 'unknown';

        } catch (err) {
            VMS[i].status = 'UNREACHABLE';
            VMS[i].assigned_ip = 'unknown';
            VMS[i].assigned_gateway = 'unknown';
        } finally {
            VMS[i].last_check = new Date().toISOString();
            ssh.dispose();
        }
    });

    await Promise.all(checks);
    console.log('Heartbeat check complete');
}

module.exports = {
    updateVmIp,
    checkVmHealth,
    VMS
};
