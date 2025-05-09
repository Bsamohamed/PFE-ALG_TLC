// server.js
require('dotenv').config();
const mainApp = require('./src/app'); // backend principal
const { checkVmHealth } = require('./src/services/vmService'); // service de vérification VM
const VMS = require('./vms.json');

const MAIN_PORT = process.env.MAIN_PORT || 5000;
const HEARTBEAT_INTERVAL = parseInt(process.env.HEARTBEAT_INTERVAL || '30000', 10);

// Écoute du backend principal sur 0.0.0.0
mainApp.listen(MAIN_PORT, '0.0.0.0', () => {
    console.log(`✅ Main server running on http://0.0.0.0:${MAIN_PORT}`);

    // Affichage des IP de gestion des VMs
    if (VMS && Array.isArray(VMS)) {
        console.log("🔍 VMs list:");
        VMS.forEach(vm => console.log(` - ${vm.id}: ${vm.management_ip}`));
    }

    // Lancement de la vérification de santé
    checkVmHealth();
    setInterval(checkVmHealth, HEARTBEAT_INTERVAL);
});

// Gestion propre de l'arrêt du serveur
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down...');
    process.exit(0);
});
