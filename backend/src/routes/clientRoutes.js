const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Routes pour gérer les clients
router.post('/', clientController.create);  // Créer un client
router.get('/', clientController.read);    // Lire tous les clients
router.get('/:id', clientController.getById);  // Lire un client par son ID
router.put('/:id', clientController.update);  // Mettre à jour un client
router.delete('/:id', clientController.remove);  // Supprimer un client

// Route pour mettre à jour la limite de données
router.put('/:id/limit', clientController.setLimit);

// Modifier la désactivation et l'activation du client pour utiliser PATCH
router.patch('/:id/disable', clientController.disable);  // Désactiver un client
router.patch('/:id/enable', clientController.enable);    // Activer un client

// Route pour déconnecter un client
router.post('/logout/:username', clientController.logout);

// Récupérer les logs d'un client
router.get('/:id/logs', clientController.getLogs);

module.exports = router;
