// Backend (server.js ou app.js)

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const radiusRoutes = require('./routes/authRoutesRadius');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gatewayRoutes = require('./routes/gatewayRoutes');
const anomalyRoutes = require('./routes/anomaly');
const vmRoutes = require('./routes/vmRoutes');
const AssigngatewayRoutes = require('./routes/AssigngatewayRoutes');






const app = express();

// Utilisation de CORS avec une origine spécifique pour le frontend
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // Autoriser les méthodes
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/radius', radiusRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', gatewayRoutes);
app.use('/api/anomaly', anomalyRoutes);
app.use('/api/vm', vmRoutes); // Toutes les routes VM
app.use('/api/gateway', AssigngatewayRoutes);




app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;








