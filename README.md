<h1 align="center">🔐 VPN Infrastructure Management System</h1>
<p align="center"><strong>Project PFE - Algérie Télécom</strong></p>


---


## 🌐 Project Overview

This project is a **self-hosted VPN access control and management platform** designed for centralized administration of VPN gateways, VPS servers, and client accounts. It integrates **infrastructure automation**, **secure networking**, and **AI-based anomaly detection** to ensure a scalable and secure private VPN environment.

----


**Main Components:**
- 🛡️ **VyOS Routers** – Act as programmable VPN gateways
- 🔄 **FreeRADIUS Server** – Handles client authentication and accounting
- 💡 **ocserv** – OpenConnect VPN server for client connections
- 🧠 **AI Module** – Detects abnormal client behavior using Isolation Forest
- 📦 **Admin Dashboard** – React + Node.js interface for system management
- 💾 **MariaDB** – Stores clients, gateways, logs, and assignments

---

## 💡 Key Features

- 🔑 Assign each client to a specific VPN gateway
- 🛰️ Prevent connection to unauthorized gateways via FreeRADIUS policies
- 📡 Centralized management of gateways, VPS servers, and clients
- 📊 Real-time logging and activity monitoring
- 🤖 AI detection of suspicious behavior (IP anomaly, login time deviation)
- 🔐 Hashed admin passwords, protected backend routes

---

## 🔧 Networking & Infrastructure Logic

### 🧩 Gateway Management (VyOS)
- Each gateway is configured with static IP routing (`eth1` in 192.168.1.X/24)
- Supports remote configuration and provisioning
- Tied to specific VPS servers to form a dedicated VPN entry point

### 🔒 Authentication via FreeRADIUS
- Clients must authenticate via FreeRADIUS before gaining access
- RADIUS validates:
  - Credentials (username/password)
  - Assigned gateway (via `NAS-IP-Address`)
  - Connection time and IP (for anomaly scoring)
- RADIUS accounting logs every session in the database

### 🔁 ocserv (OpenConnect)
- Lightweight VPN server running on VyOS
- Auth request is forwarded to FreeRADIUS
- Uses certificates (TLS) + credentials to secure the channel

### 🧠 AI Security
- Logs are analyzed by an Isolation Forest model
- Detects:
  - Clients connecting at odd times
  - Unusual IP sources
  - Abnormally short/long session durations
- Suspicious behavior is flagged in the admin panel

---

## 📁 Project Structure

```bash
PFE-VPN/
├── frontend/              # React admin dashboard
├── backend/               # Node.js + Express backend API
│   └── ai-module/          # Python scripts: training, detection
├── infrastructure/
│   ├── vyos/           # Gateway config (config.boot)
│   │     └── ocserv/   # VPN server config
│   ├── freeradius/     # RADIUS config files
│   │     └── database/  # SQL schema and seed
│   └── Virtual Machins VPS
├── docs/               # Architecture diagram, user guide
└── README.md
