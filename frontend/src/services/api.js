import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientService = {
  
  // Récupérer tous les clients
  getAllClients: () => api.get('/clients'),
  
  // Récupérer un client par son ID
  getClientById: (id) => api.get(`/clients/${id}`),
  
  // Créer un nouveau client
  createClient: (clientData) => api.post('/clients', clientData),
  
  // Mettre à jour un client
  updateClient: (id, clientData) => api.put(`/clients/${id}`, clientData),
  
  // Supprimer un client
  deleteClient: (id) => api.delete(`/clients/${id}`),
  
  // Mettre à jour la limite de données
  setDataLimit: (id, limit) => api.put(`/clients/${id}/limit`, { data_limit: limit }),
  
  disableClient: (id) => api.patch(`/clients/${id}/disable`),
  enableClient: (id) => api.patch(`/clients/${id}/enable`),
  
  
  // Déconnecter un client
  forceLogout: (username) => api.delete(`/clients/logout/${username}`),
  
  // Récupérer les logs d'un client
  getClientLogs: (id) => api.get(`/clients/${id}/logs`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    params: {
      t: new Date().getTime(), // Ajoute un timestamp pour forcer le refresh
    },
  }),
  
  
  // Récupérer les sessions d'un client
  getClientSessions: (id) => api.get(`/clients/${id}/sessions`),

  // Obtenir les anomalies détectées
  
  getAnomalies: () => api.get('/anomaly/detect'),
};
