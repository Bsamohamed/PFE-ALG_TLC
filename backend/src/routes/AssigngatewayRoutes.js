const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const gatewayMap = {
  1: "192.168.4.40",
  2: "192.168.4.20",
  3: "192.168.4.30",
};

const dbConfig = {
  host: "192.168.4.10",
  user: "mohammed",
  password: "mohammed",
  database: "freeradius",
};

router.post("/assign-gateway/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { gateway } = req.body;

  const gatewayIP = gatewayMap[gateway];

  if (!gatewayIP) {
    return res.status(400).json({ error: "Invalid gateway number (1, 2, or 3 only)" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT * FROM radcheck WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      await connection.end();
      return res.status(404).json({ error: "No radcheck entry found with that ID" });
    }

    const username = rows[0].username;

    const [nasRows] = await connection.execute(
      "SELECT * FROM radcheck WHERE username = ? AND attribute = 'NAS-IP-Address'",
      [username]
    );

    if (nasRows.length > 0) {
      await connection.execute(
        "UPDATE radcheck SET value = ? WHERE username = ? AND attribute = 'NAS-IP-Address'",
        [gatewayIP, username]
      );
    } else {
      await connection.execute(
        "INSERT INTO radcheck (username, attribute, op, value) VALUES (?, 'NAS-IP-Address', ':=', ?)",
        [username, gatewayIP]
      );
    }

    await connection.end();
    res.json({ message: `Assigned gateway ${gatewayIP} to user '${username}' (ID: ${id})` });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
