from flask import Flask, request, jsonify
from flask_cors import CORS  # Allow requests from React frontend
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app) 


try:
    model = joblib.load("model.pkl") 
    print(" Model Loaded Successfully!")
except Exception as e:
    print(f" Error loading model: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
    
        data = request.get_json()
        print(f" Received Data: {data}")

      
        year = int(data['year'])
        present_price = float(data['present_price'])
        kms_driven = int(data['kms_driven'])
        fuel_type = data['fuel_type']
        seller_type = data['seller_type']
        transmission = data['transmission']
        owner = int(data['owner'])

       
        fuel_type_encoded = 0 if fuel_type == "Petrol" else 1 if fuel_type == "Diesel" else 2
        seller_type_encoded = 0 if seller_type == "Dealer" else 1
        transmission_encoded = 0 if transmission == "Manual" else 1

       
        features = np.array([[year, present_price, kms_driven, fuel_type_encoded, seller_type_encoded, transmission_encoded, owner]])
        print(f"📊 Input Features: {features}")

      
        if hasattr(model, "feature_names_in_"):
            features_df = pd.DataFrame(features, columns=model.feature_names_in_)
            predicted_price = model.predict(features_df)
        else:
            predicted_price = model.predict(features)

       
        response = {"predicted_price": round(predicted_price[0], 2)}
        print(f"💰 Predicted Price: {response}")
        return jsonify(response)

    except Exception as e:
        print(f" Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
