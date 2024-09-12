import numpy as np
from sklearn.externals import joblib

# Load your trained ML model
model = joblib.load('models/career_predictor_model.pkl')

def run_prediction(data):
    """
    This function takes the data from the message and performs prediction using the ML model.
    """
    # Perform any necessary data preprocessing here
    input_features = np.array(data['input_data']).reshape(1, -1)

    # Make prediction
    prediction = model.predict(input_features)

    return {'prediction': prediction[0]}
