import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import AssignCard from "../components/AssignCard";
import "../styles/ConsultVPS.css";
import { clientService } from "../services/api";

const ConsultVPS = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAssignCard, setShowAssignCard] = useState(false);
    const [selectedVPS, setSelectedVPS] = useState(null);
    const [vpsData, setVpsData] = useState([]);

    useEffect(() => {
        const fetchVpsData = async () => {
            try {
                const response = await clientService.getVpsStatus();
                setVpsData(response.data);
            } catch (error) {
                console.error("Error fetching VPS data:", error);
            }
        };

        fetchVpsData();
    }, []);

    const filteredVPS = vpsData.filter((vps) =>
        vps.id.toString().includes(searchTerm)
    );

    const handleAssignClick = (vps) => {
        setSelectedVPS(vps);
        setShowAssignCard(true);
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="consult-vps-content">
                <h2>Manage VPS</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter VPS ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className="vps-table">
                    <thead>
                        <tr>
                            <th>VPS ID</th>
                            <th>Status</th>
                            <th>Gateway</th>
                            <th>IP address</th>
                            <th>Assign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVPS.map((vps) => (
                            <tr key={vps.id}>
                                <td>
                                    <a href={`/vps/${vps.id}`} className="vps-link">
                                        #{vps.id}
                                    </a>
                                </td>
                                <td>
                                    <span className={vps.status === "Reachable" ? "status-reachable" : "status-unreachable"}>
                                        {vps.status}
                                    </span>
                                </td>
                                <td>{vps["assigned_gateway"] || "-"}</td>
                                <td>{vps["assigned_ip"] || "-"}</td>
                                <td>
                                    <button className="assign-button" onClick={() => handleAssignClick(vps)}>
                                        <FaLink />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAssignCard && selectedVPS && (
                <AssignCard
                    vps={selectedVPS}
                    onClose={() => setShowAssignCard(false)}
                />
            )}
        </div>
    );
};

export default ConsultVPS;