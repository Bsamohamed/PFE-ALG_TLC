from flask import Flask, request, jsonify
import joblib
import pandas as pd
import json
import mysql.connector

app = Flask(__name__)

# Charger le modèle IA
model = joblib.load('anomaly_model.joblib')

# Charger les colonnes officielles
with open("columns.json", "r") as f:
    expected_columns = json.load(f)

# Connexion à la base
def get_db_connection():
    return mysql.connector.connect(
        host= '192.168.4.10',     
        user= 'mohammed',
        password= 'mohammed',
        database= 'freeradius',
    )

# 🔮 Endpoint 1 : prédiction via données envoyées (Postman)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("🔵 Données reçues : ", data[:1])

        df = pd.DataFrame(data)
        df = pd.get_dummies(df)
        df = df.fillna(0)

        # Aligner les colonnes
        for col in expected_columns:
            if col not in df.columns:
                df[col] = 0
        df = df[expected_columns]

        predictions = model.predict(df)
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        print("❌ Erreur prédiction :", e)
        return jsonify({'error': str(e)}), 500

# 🔮 Endpoint 2 : prédiction directe depuis la base radacct
@app.route('/predict-from-db', methods=['GET'])
def predict_from_db():
    try:
        conn = get_db_connection()
        query = "SELECT * FROM radacct ORDER BY radacctid DESC LIMIT 100"
        df = pd.read_sql(query, conn)
        conn.close()

        # Transformation datetime -> timestamp int
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

        # Aligner les colonnes avec le modèle
        for col in expected_columns:
            if col not in df.columns:
                df[col] = 0
        df = df[expected_columns]

        # Prédiction
        predictions = model.predict(df)
        df_result = df.copy()
        df_result['prediction'] = predictions

        return df_result.to_json(orient='records')

    except Exception as e:
        print("❌ Erreur prédiction DB :", e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
