import React, { useState } from "react";
import "../styles/AssignCard.css";
import { clientService } from "../services/api";

const AssignCard = ({ onClose, vps }) => {   // <- accept vps as prop here
  const [thirdOctet, setThirdOctet] = useState("gateway1");
  const [fourthOctet, setFourthOctet] = useState("");

  const handleAssign = async () => {
    const gatewayMapping = {
      gateway1: 1,
      gateway2: 2,
      gateway3: 3,
    };
  
    const gatewayNumber = gatewayMapping[thirdOctet];
    const host = parseInt(fourthOctet, 10);

  
    // Check if the host number is valid (between 1 and 254)
    if (host < 1 || host > 254) {
      alert("Please enter a valid host number between 1 and 254.");
      return;
    }
  
    try {
      const response = await clientService.assignGatewayVPS(vps.id, gatewayNumber, host);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error assigning gateway:", error);
    }
  };
  

  return (
    <div className="assign-card">
      <h3>Assign the VPS {vps.name} to a Gateway</h3> {/* Example usage */}
      <div className="ip-form">
        <span>172</span>.
        <span>20</span>.
        <select
          value={thirdOctet}
          onChange={(e) => setThirdOctet(e.target.value)}
        >
          <option value="gateway1">gateway1</option>
          <option value="gateway2">gateway2</option>
          <option value="gateway3">gateway3</option>
        </select>
        .
        <input
          type="number"
          value={fourthOctet}
          onChange={(e) => setFourthOctet(e.target.value)}
        />
        /24
      </div>

      <div className="assign-buttons">
        <button className="assign-submit" onClick={handleAssign}>
          Assign
        </button>
        <button className="assign-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignCard;
