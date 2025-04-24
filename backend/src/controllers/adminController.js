const radiusDB = require('../models/db');
const adminService = require('../services/adminService');
const bcrypt = require('bcrypt');



const loginAdmin = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const result = await adminService.login(email, username, password);
    res.status(200).json({ message: 'Connexion réussie', ...result });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

//changement de password pour ladmin

const changePassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
  
    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
  
    try {
      // Step 1: Get admin by username
      const [[admin]] = await radiusDB.query('SELECT * FROM Admin WHERE username = ?', [username]);
      if (!admin) {
        return res.status(404).json({ error: 'Admin non trouvé' });
      }
  
      // Step 2: Verify current password
      const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
      }
  
      // Step 3: Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Step 4: Update password in the database
      await radiusDB.query('UPDATE Admin SET password = ? WHERE username = ?', [hashedNewPassword, username]);
  
      return res.json({ message: 'Mot de passe mis à jour avec succès ✅' });
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };


  const getAdminProfile = async (req, res) => {
    try {
      const [[admin]] = await radiusDB.query("SELECT username, email, password FROM Admin WHERE username = ?", [req.admin.username]);
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du profil." });
    }
  };
  

  module.exports = {
    loginAdmin,
    changePassword,
    getAdminProfile
  };
  
