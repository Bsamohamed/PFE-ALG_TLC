const fs = require('fs');
const path = require('path');
const radiusDB = require('../models/db');
const axios = require('axios');


exports.getRadacctData = async (req, res) => {
  try {
    const [rows] = await radiusDB.query('SELECT * FROM radacct');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching radacct data:', error.message);
    res.status(500).json({ error: 'Error fetching radacct data' });
  }
};

exports.exportRadacctToJson = async (req, res) => {
    try {
      const [rows] = await radiusDB.query('SELECT * FROM radacct');
      const filePath = path.join(__dirname, '../../src/IA/radacct_data.json');
      fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
      res.status(200).json({ message: '✅ Données exportées avec succès.' });
    } catch (error) {
      console.error('Erreur export JSON :', error.message);
      res.status(500).json({ error: 'Erreur export JSON' });
    }
  };


  exports.checkAnomalies = async (req, res) => {
    try {
      const [rows] = await radiusDB.query('SELECT * FROM radacct');
  
      // Envoie les données au microservice Flask
      const flaskResponse = await axios.post('http://localhost:5001/predict', rows);
      const predictions = flaskResponse.data.predictions;
  
      // Retourner les lignes marquées comme anomalies (-1)
      const anomalies = rows.filter((_, idx) => predictions[idx] === -1);
  
      res.status(200).json({ anomalies, total: anomalies.length });
    } catch (err) {
      console.error('Erreur détection anomalies :', err.message);
      res.status(500).json({ error: 'Erreur de détection d\'anomalies' });
    }
  };
  