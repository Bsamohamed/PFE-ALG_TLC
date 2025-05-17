PFE-AT: VPN Access Control with Anomaly Detection

📌 Overview

PFE-AT is a comprehensive solution integrating a VPN access control system with an AI-based anomaly detection module. It leverages FreeRADIUS for authentication, VyOS for gateway management, and an Isolation Forest algorithm to detect and mitigate unauthorized access attempts.



🛠️ Features

User Authentication: Secure login through FreeRADIUS.

Gateway Assignment: Each user is assigned a specific VPN gateway.

Anomaly Detection: Utilizes Isolation Forest to identify unusual access patterns.

Web Interface: User-friendly dashboard for monitoring and management.




📁 Project Structure


PFE-AT/

├── backend/   
        
├── frontend/    
      
├── ai-module/  
       
├── infrastructure/   
 
├── database/      
    
├── docs/
             
├── .gitignore

├── README.md

└── package-lock.json





🚀 Getting Started

Prerequisites
Node.js (v14 or higher)

Python (v3.8 or higher)

MySQL (v5.7 or higher)

VyOS (for gateway configuration)

ocserv (OpenConnect VPN server)





📊 AI Module: Isolation Forest

The AI module employs the Isolation Forest algorithm to detect anomalies in VPN access patterns. It analyzes features such as login times, IP addresses, and user behavior to identify potential security threats.




🖥️ Web Interface

The React.js frontend provides administrators with a dashboard to:

Monitor user activity

View detected anomalies

Manage user access and gateway assignments
Reddit





📄 Documentation

Detailed documentation, including system architecture diagrams and use case descriptions, is available in the docs/ directory.




Feel free to customize this README.md to better fit the specifics of your project. Let me know if you need assistance with any particular section!
