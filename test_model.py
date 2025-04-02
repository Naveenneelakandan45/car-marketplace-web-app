import pickle

try:
    with open("model.pkl", "rb") as file:
        model = pickle.load(file)
    
    print("✅ Model Loaded Successfully:", type(model))

    # Check if model has a `predict` method
    if hasattr(model, "predict"):
        print("✅ Model is a trained machine learning model.")
    else:
        print("❌ model.pkl is not a trained ML model.")

except Exception as e:
    print("❌ Error loading model:", e)
