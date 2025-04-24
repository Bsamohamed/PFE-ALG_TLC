import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
import json

# Charger les données JSON exportées depuis la BDD
with open('radacct_data.json', 'r') as f:
    data = json.load(f)

df = pd.DataFrame(data)

# 🔁 Convertir les colonnes datetime en timestamps
for col in ['acctstarttime', 'acctupdatetime', 'acctstoptime']:
    if col in df.columns:
        df[col] = pd.to_datetime(df[col], errors='coerce').astype('int64') // 10**9

# ❌ Supprimer les colonnes qui n’aident pas le modèle
df.drop(columns=['radacctid', 'acctuniqueid', 'acctsessionid'], errors='ignore', inplace=True)

# 🧼 Nettoyage : valeurs manquantes
df = df.fillna({
    col: 0 if df[col].dtype in ['int64', 'float64'] else 'missing'
    for col in df.columns
})

# ⚙️ Encodage one-hot des colonnes catégorielles
df = pd.get_dummies(df)

# 🧠 Entraîner le modèle Isolation Forest
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
model.fit(df)

# 💾 Sauvegarder le modèle
joblib.dump(model, 'anomaly_model.joblib')

# 🧾 Sauvegarder les colonnes utilisées
with open("columns.json", "w") as f:
    json.dump(df.columns.tolist(), f)

print("✅ Modèle entraîné et sauvegardé.")
