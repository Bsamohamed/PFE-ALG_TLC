import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import ClientInfoModal from "../components/ClientInfoModal";
import EditClientModal from "../components/EditClientModal";
import ActionMenu from "../components/ActionMenu";
import SetDataLimitModal from "../components/SetDataLimitModal";
import ForceLogoutModal from "../components/ForceLogoutModal"; 
import DisableAccountModal from "../components/DisableAccountModal";
import EnableAccountModal from "../components/EnableAccountModal";  
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"; 
import SessionMonitorModal from "../components/SessionMonitorModal";
import CreateClientCard from '../components/CreateClientCard';
import { FaLink, FaUnlink, FaPen, FaInfoCircle, FaTrash, FaEllipsisV } from "react-icons/fa";
import "../styles/ManageClients.css";
import { clientService } from "../services/api";

const initialClients = [
  { id: 1, name: "Cosider", status: "Active", ip: "", assignment: "Not Assigned", email: "cosider@example.com", startDate: "01/01/2024", endDate: "01/01/2026" },
  { id: 2, name: "Sonalagaze", status: "Offline", ip: "192.168.1.20", assignment: "Gateway 01", email: "sonalagaze@example.com", startDate: "02/02/2024", endDate: "02/02/2026" },
  { id: 3, name: "Ooredoo", status: "Offline", ip: "192.168.1.19", assignment: "Gateway 04", email: "Ooredoo-Service@Ooredoo.dz", startDate: "05/03/2025", endDate: "05/03/2027" },
];

const ManageClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [menuClient, setMenuClient] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [dataLimitClient, setDataLimitClient] = useState(null);
  const [logoutClient, setLogoutClient] = useState(null);
  const [disableAccount, setDisableAccount] = useState(null);
  const [enableClient, setEnableClient] = useState(null);
  const [sessionClient, setSessionClient] = useState(null);
  const [deleteClient, setDeleteClient] = useState(null);
  const [showCreateClientCard, setShowCreateClientCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await clientService.getAllClients();
        setClients(response.data.map(mapApiToClient));
      } catch (err) {
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  // Convertit les données de l'API dans le format attendu
  const mapApiToClient = (apiClient) => ({
    id: apiClient.idClient,
    name: apiClient.nom || 'Reload To Show Name' ,
    email: apiClient.email || '',
    status: apiClient.status || 'Offline',
    ip: apiClient.ip_address || '',
    assignment: apiClient.assignment || 'Not Assigned',
    startDate: apiClient.begin_usage_date || new Date().toISOString(),
    endDate: apiClient.end_usage_date || new Date().toISOString()
  });

  // Fonction appelée lors de la création d'un nouveau client
  const handleCreateClient = async (newClient) => {
    try {
      const apiData = {
        nom: newClient.clientName,
        email: newClient.email,
        ip_address: newClient.ipAddress,
        password: newClient.password,
        begin_usage_date: newClient.beginDate,
        end_usage_date: newClient.endDate,
        data_limit: newClient.dataLimit,
      };

     if (!/^\d+\s?(MB|GB|TB)$/i.test(newClient.dataLimit)) {
  setError("Format de limite invalide. Ex: 500 MB, 10 GB");
  return;
}

      
  
      const response = await clientService.createClient(apiData);
  
      // 🔄 Option 1 : Si l'API ne renvoie pas l'IP, faire un GET par ID
      const createdClientId = response.data?.idClient;
  
      // Si l'API n'inclut pas ip_address dans la réponse :
      const getResponse = await clientService.getClientById(createdClientId); // 👉 à implémenter dans `clientService`
  
      const newClientData = mapApiToClient(getResponse.data);
  
      // 📌 Met à jour la liste localement
      setClients((prevClients) => [...prevClients, newClientData]);
      setShowCreateClientCard(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create client");
    }
  };
  

  const handleEditSave = async (updatedClient) => {
    try {
      const apiData = {
        nom: updatedClient.name,
        email: updatedClient.email,
        password: updatedClient.password,
        begin_usage_date: updatedClient.startDate,
        end_usage_date: updatedClient.endDate
      };
      await clientService.updateClient(updatedClient.id, apiData);
      setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    } catch (err) {
      setError("Failed to update client");
    }
  };

  const handleDelete = async (id) => {
    try {
      await clientService.deleteClient(id);
      setClients(clients.filter(c => c.id !== id));
      setDeleteClient(null); // Fermer le modal après suppression
    } catch (err) {
      setError("Failed to delete client");
    }
  };
  

  const handleMenuOpen = (event, client) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + 5, left: rect.left });
    setMenuClient(client);
  };

  const filteredClients = clients.filter((client) => {
    const name = client.name?.toLowerCase() || '';
    const id = client.id?.toString() || '';
    return name.includes(search.toLowerCase()) || id.includes(search);
  });


  const handleDisableAccount = async () => {
    try {
      await clientService.disableClient(disableAccount.id); // Assure-toi que l’API existe
      setClients((prev) =>
        prev.map((client) =>
          client.id === disableAccount.id
            ? { ...client, status: "Disabled" }
            : client
        )
      );
      setDisableAccount(null);
    } catch (err) {
      setError("Failed to disable account");
    }
  };
  
  const handleEnableAccount = async () => {
    try {
      await clientService.enableClient(enableClient.id); // Assure-toi que l’API existe
      setClients((prev) =>
        prev.map((client) =>
          client.id === enableClient.id
            ? { ...client, status: "Active" }
            : client
        )
      );
      setEnableClient(null);
    } catch (err) {
      setError("Failed to enable account");
    }
  };
  

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="manage-clients">
        <button className="create-btn" onClick={() => setShowCreateClientCard(!showCreateClientCard)}>
          ➕ Create a New Client Account
        </button>

        {showCreateClientCard && (
          <div className="create-client-modal">
            <CreateClientCard 
              onCreate={handleCreateClient}
              onCancel={() => setShowCreateClientCard(false)}
            />
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Client Name or ID"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Status</th>
                <th>IP Address</th>
                <th>Assignment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>#{client.id}</td>
                  <td>{client.name}</td>
                  <td className={client.status === "Active" ? "active" : "offline"}>
                    {client.status === "Active" ? "🟢 Active" : "⚫ Offline"}
                  </td>
                  <td>{client.ip || "Not Assigned"}</td>
                  <td>{client.assignment}</td>
                  <td className="actions">
                    {client.assignment === "Not Assigned" ? (
                      <FaLink className="icon link" title="Assign Gateway" />
                    ) : (
                      <FaUnlink className="icon unlink" title="Unassign Gateway" />
                    )}
                    <FaPen 
                      className="icon edit" 
                      title="Edit Client" 
                      onClick={() => setEditingClient(client)}
                    />
                    <FaInfoCircle 
                      className="icon info" 
                      title="Client Info" 
                      onClick={() => setSelectedClient(client)}
                    />
                    <FaTrash 
                      className="icon delete"
                      title="Delete Client"
                      onClick={() => setDeleteClient(client)}
                    />
                    <FaEllipsisV 
                      className="icon more" 
                      title="More Options" 
                      onClick={(e) => handleMenuOpen(e, client)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteClient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              You are going to Delete <strong>{deleteClient.name}</strong> Account
            </h2>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteClient(null)}>Cancel</button>
              <button className="delete-btn" onClick={() => handleDelete(deleteClient.id)}>
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {menuClient && (
        <div 
          className="menu-wrapper"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <ActionMenu 
            client={menuClient} 
            setDataLimitClient={setDataLimitClient}
            setLogoutClient={setLogoutClient}
            setDisableAccount={setDisableAccount}
            setEnableClient={setEnableClient} // ✅ tu passes bien la fonction, pas la valeur
            setSessionClient={setSessionClient} 
            setDeleteClient={setDeleteClient}
            onClose={() => setMenuClient(null)}
          />
        </div>
      )}

      {selectedClient && <ClientInfoModal client={selectedClient} onClose={() => setSelectedClient(null)} />}
      {editingClient && <EditClientModal client={editingClient} onSave={handleEditSave} onClose={() => setEditingClient(null)} />}
      {dataLimitClient && <SetDataLimitModal client={dataLimitClient} onClose={() => setDataLimitClient(null)} />}
      {logoutClient && <ForceLogoutModal client={logoutClient} onClose={() => setLogoutClient(null)} />}
      {disableAccount && (
  <DisableAccountModal
    client={disableAccount}
    onClose={() => setDisableAccount(null)}
    onConfirm={handleDisableAccount}
  />
)}

{enableClient && (
  <EnableAccountModal
    client={enableClient}
    onClose={() => setEnableClient(null)}
    onConfirm={handleEnableAccount}
  />
)}


{sessionClient && (
  <SessionMonitorModal
    client={sessionClient}
    onClose={() => setSessionClient(null)}
  />
)}


    </div>
  );
};

export default ManageClients;
