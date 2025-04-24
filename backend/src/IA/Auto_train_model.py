import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
import json
import mysql.connector

# Connexion à la base
def get_db_connection():
    return mysql.connector.connect(
         host= '172.16.110.130',     
         user= 'mohammed',
         password= 'mohammed',
         database= 'freeradius',
    )

# Charger les données depuis la base radacct
def load_data_from_db():
    conn = get_db_connection()
    query = "SELECT * FROM radacct"
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# Prétraitement des données
def preprocess_data(df):
    # Transformation datetime -> timestamp
    for col in ['acctstarttime', 'acctupdatetime', 'acctstoptime']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce').astype('int64') // 10**9

    # Supprimer les colonnes inutiles
    df.drop(columns=['radacctid', 'acctuniqueid', 'acctsessionid'], errors='ignore', inplace=True)

    # Remplacer les valeurs manquantes
    df = df.fillna({
        col: 0 if df[col].dtype in ['int64', 'float64'] else 'missing'
        for col in df.columns
    })

    # One-hot encoding
    df = pd.get_dummies(df)

    # Charger les colonnes officielles (en supposant que tu as déjà ce fichier)
    with open("columns.json", "r") as f:
        expected_columns = json.load(f)

    # Aligner les colonnes
    for col in expected_columns:
        if col not in df.columns:
            df[col] = 0
    df = df[expected_columns]

    return df

# Entraîner le modèle
def train_model():
    df = load_data_from_db()
    df_preprocessed = preprocess_data(df)

    model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
    model.fit(df_preprocessed)

    # Sauvegarder le modèle entraîné
    joblib.dump(model, 'anomaly_model.joblib')
    print("✅ Modèle réentraîné et sauvegardé.")

if __name__ == "__main__":
    train_model()
