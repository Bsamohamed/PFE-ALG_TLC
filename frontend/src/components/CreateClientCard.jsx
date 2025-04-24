import { useState } from "react";
import "../styles/CreateClientCard.css";

const CreateClientCard = ({ onCreate, onCancel }) => {
  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ipAddress, setIpAddress] = useState(""); // Ajouté ici
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLimit, setDataLimit] = useState("");


  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formattedData = {
      clientName,
      email,
      password,
      beginDate: new Date(beginDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
      ipAddress, // Ajouté ici
      dataLimit,
    };

    try {
      setIsLoading(true);
      await onCreate(formattedData);
      // Réinitialisation après succès
      setEmail("");
      setClientName("");
      setPassword("");
      setConfirmPassword("");
      setBeginDate("");
      setEndDate("");
      setIpAddress(""); // Réinitialiser aussi l'IP
      onCancel();
    } catch (err) {
      setError("Error creating client: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create a New Client Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="👤 Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="📡 Adresse IP (ex: 10.8.0.9)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          required
        />
        <input
  type="text"
  placeholder="📊 Limite de données (ex: 10 GB)"
  value={dataLimit}
  onChange={(e) => setDataLimit(e.target.value)}
  required
/>

        <input
          type="password"
          placeholder="🔒 Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      
        <label>Begin Date</label>
        <input
          type="date"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
          min={today}
          required
        />
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
       

        {error && <p className="error">{error}</p>}

        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientCard;
