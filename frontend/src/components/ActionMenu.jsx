import React, { useEffect, useRef } from "react";
import "../styles/ActionMenu.css";


const ActionMenu = ({ client, setDataLimitClient,setLogoutClient,setSessionClient,setDeleteClient,setDisableAccount,setEnableClient,onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} className="action-menu">
      
  
<button onClick={() => { setDisableAccount(client); onClose(); }}>
  Disable Account
</button>
<button onClick={() => { setEnableClient(client); onClose(); }}>
  Enable Account
</button>

<button onClick={() => {
  setSessionClient(client);
  onClose(); // ferme le menu contextuel
}}> Monitor Sessions</button>




    </div>
  );
};

export default ActionMenu;
