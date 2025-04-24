import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
import json
import mysql.connector

# 🔌 Connexion à la base MariaDB (FreeRADIUS)
conn = mysql.connector.connect(
  host= '172.16.110.130',     
  user= 'mohammed',
  password= 'mohammed',
  database= 'freeradius',

)

# 🧾 Requête pour récupérer toutes les données de radacct
query = "SELECT * FROM radacct"

# 📥 Charger dans un DataFrame
df = pd.read_sql(query, conn)
conn.close()

# 🔁 Convertir les colonnes datetime
for col in ['acctstarttime', 'acctupdatetime', 'acctstoptime']:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors='coerce').astype('int64') // 10**9

# ❌ Supprimer les colonnes inutiles
df.drop(columns=['radacctid', 'acctuniqueid', 'acctsessionid'], errors='ignore', inplace=True)

# 🧼 Nettoyage des données
df = df.fillna({
    col: 0 if df[col].dtype in ['int64', 'float64'] else 'missing'
    for col in df.columns
})

# 🔠 Encodage one-hot
df = pd.get_dummies(df)

# 🧠 Entraînement Isolation Forest
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
model.fit(df)

# 💾 Sauvegarde
joblib.dump(model, 'anomaly_model.joblib')

# 📋 Sauvegarde des colonnes
with open("columns.json", "w") as f:
    json.dump(df.columns.tolist(), f)

print("✅ Modèle entraîné directement depuis la base de données.")
