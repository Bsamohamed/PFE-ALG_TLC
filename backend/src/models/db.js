// src/models/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const radiusDB = mysql.createPool({
  host: '192.168.4.10',     
  user: 'mohammed',
  password: 'mohammed',
  database: 'freeradius',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Test de connexion automatique avec une requête simple
(async () => {
  try {
    const connection = await radiusDB.getConnection();
    await connection.ping();
    console.log('✅ Connected to FreeRADIUS DB');
    connection.release();
  } catch (err) {
    console.error('❌ Radius DB connection failed:', err.message);
  }
})();

module.exports = radiusDB;









/*
db configuration 

USE freeradius;

-- 1. Paramètres généraux
CREATE TABLE Settings (
    idSettings INT AUTO_INCREMENT PRIMARY KEY,
    language VARCHAR(20),
    time_zone VARCHAR(50)
);

-- 2. Compte administrateur
CREATE TABLE AdminAccount (
    idAdminAccount INT AUTO_INCREMENT PRIMARY KEY,
    creation_date DATE,
    idSettings INT,
    FOREIGN KEY (idSettings) REFERENCES Settings(idSettings)
);

-- 3. Admins
CREATE TABLE Admin (
    username VARCHAR(100) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    idAdminAccount INT NOT NULL,
    FOREIGN KEY (idAdminAccount) REFERENCES AdminAccount(idAdminAccount)
);

-- 4. Notifications pour l’admin
CREATE TABLE Notification (
    idNotification INT AUTO_INCREMENT PRIMARY KEY,
    time DATETIME,
    message TEXT,
    status ENUM('sent', 'pending') DEFAULT 'pending',
    idAdminAccount INT NOT NULL,
    FOREIGN KEY (idAdminAccount) REFERENCES AdminAccount(idAdminAccount)
);

-- 5. Compte client (quota, durée, logs…)
CREATE TABLE ClientAccount (
    idClientAccount INT AUTO_INCREMENT PRIMARY KEY,
    data_limit VARCHAR(50),
    logs TEXT,
    begin_usage_date DATE,
    end_usage_date DATE
);

-- 6. Client
CREATE TABLE Client (
    idClient INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creation_date DATE,
    idClientAccount INT,
    FOREIGN KEY (idClientAccount) REFERENCES ClientAccount(idClientAccount)
);

-- 7. Serveur VPS
CREATE TABLE VPS (
    idVps INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    ip_address VARCHAR(45),
    os VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'inactive',
    idClient INT,
    FOREIGN KEY (idClient) REFERENCES Client(idClient)
);

-- 8. Passerelles VPN (ex: VyOS)
CREATE TABLE Gateway (
    idGateway INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    ip_address VARCHAR(45),
    status ENUM('active', 'inactive') DEFAULT 'inactive',
    idClient INT,
    FOREIGN KEY (idClient) REFERENCES Client(idClient)
);

-- 9. Association IP
CREATE TABLE IpAddress (
    ip VARCHAR(45) PRIMARY KEY,
    idClient INT,
    idGateway INT,
    FOREIGN KEY (idClient) REFERENCES Client(idClient),
    FOREIGN KEY (idGateway) REFERENCES Gateway(idGateway)
);



*/ 


