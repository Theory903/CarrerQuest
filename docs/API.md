# Developer Guide for CareerQuest

## Introduction

CareerQuest is an AI-driven web application for career guidance. This guide provides a comprehensive overview of how to add new functionalities, work with the project's file structure, and ensure the API works efficiently.

## Project Structure

The CareerQuest project is divided into two main parts: the frontend and backend. Here’s a breakdown of the file structure:

```
CareerQuest/
│
├── ML/                           # Machine Learning-related files
│   ├── models/                   # Pre-trained and custom models
│   ├── data/                     # Datasets for training and testing
│   ├── notebooks/                # Jupyter notebooks for prototyping ML models
│   ├── scripts/                  # Python scripts for model training, evaluation
│   ├── worker.py                 # RabbitMQ worker script for handling tasks
│   ├── preprocessing.py          # Data preprocessing scripts
│   ├── prediction.py             # Prediction logic for the models
│   └── requirements.txt          # Dependencies for ML environment
│
├── Webapp/                       # Frontend and Backend code
│    ├── src/                     # React components and assets
│    ├── public/                  # Public assets (HTML, images)
│    ├── server/                  # Backend code (Node.js, Express)
│    │      ├── controllers/      # API request controllers
│    │      ├── models/           # Database models (MongoDB)
│    │      ├── routes/           # API routes
│    │      ├── utils/            # Utility functions (e.g., for auth, validation)
│    │      └── server.js         # Entry point for backend
│    └── package.json             # Backend dependencies
│
├── .gitignore                    # List of files/folders to ignore in Git
├── LICENSE                       # License file for the project (Apache-2.0)
├── README.md                     # Project overview and documentation
├── CONTRIBUTING.md               # Guidelines for contributing to the project
└── docs/                         # Documentation and resources
    ├── API.md                    # API documentation
    ├── ML_documentation.md       # Machine Learning model details
    └── usage_instructions.md     # User guide for the web app
```

## Adding Functionality

### 1. Understanding the File Structure

- **ML Directory:** Contains machine learning models, data, preprocessing scripts, and worker scripts. If you're adding new ML features, update the relevant Python files here.
- **Webapp Directory:** This is divided into `src` for frontend code and `server` for backend code.
  - **`src` (Frontend):** Contains React components and assets. Add new components, views, or utilities here.
  - **`server` (Backend):** Contains Express.js setup, API routes, controllers, and models.

### 2. Adding New API Endpoints

1. **Define the API Route:**
   - Add a new route file in `Webapp/server/routes/`. For example, `Webapp/server/routes/newFeature.js`:
     ```javascript
     const express = require('express');
     const router = express.Router();
     const NewFeatureController = require('../controllers/newFeatureController');

     router.get('/', NewFeatureController.getNewFeature);
     router.post('/', NewFeatureController.createNewFeature);

     module.exports = router;
     ```

2. **Create the Controller:**
   - Add a corresponding controller file in `Webapp/server/controllers/`. For example, `Webapp/server/controllers/newFeatureController.js`:
     ```javascript
     exports.getNewFeature = (req, res) => {
       // Logic to get the new feature data
     };

     exports.createNewFeature = (req, res) => {
       // Logic to create a new feature
     };
     ```

3. **Update the Model:**
   - If your new feature involves database changes, update or create a new model in `Webapp/server/models/`. For example, `Webapp/server/models/newFeatureModel.js`:
     ```javascript
     const mongoose = require('mongoose');

     const newFeatureSchema = new mongoose.Schema({
       name: String,
       description: String
     });

     module.exports = mongoose.model('NewFeature', newFeatureSchema);
     ```

4. **Register the Route:**
   - In `Webapp/server/server.js`, include the new route:
     ```javascript
     const newFeatureRoutes = require('./routes/newFeature');
     app.use('/api/newFeature', newFeatureRoutes);
     ```

### 3. Integrating New Machine Learning Features

1. **Update ML Scripts:**
   - Add or modify Python scripts in `ML/scripts/`. For example, if you’re adding a new prediction model:
     ```python
     from new_model import NewModel

     model = NewModel.load('path/to/model')

     def predict(data):
         return model.predict(data)
     ```

2. **Create or Update Worker:**
   - Modify `ML/worker.py` to handle tasks related to the new model. Ensure it processes data and interacts with RabbitMQ as needed.

3. **Connect API to ML Models:**
   - In `Webapp/server/controllers/mlController.js`, send tasks to RabbitMQ:
     ```javascript
     exports.sendToQueue = async (data) => {
       const connection = await amqp.connect('amqp://localhost');
       const channel = await connection.createChannel();
       await channel.assertQueue('ml_queue');
       channel.sendToQueue('ml_queue', Buffer.from(JSON.stringify(data)));
       await connection.close();
     };
     ```

### 4. Setting Up RabbitMQ

1. **Configure RabbitMQ:**
   - Ensure RabbitMQ is running. Use Docker for setup if not already installed:
     ```bash
     docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
     ```

2. **Define Queues and Exchanges:**
   - Use RabbitMQ management interface or configuration files to set up necessary queues and exchanges.

3. **Develop RabbitMQ Workers:**
   - Implement workers in `ML/worker.py` to consume messages and process tasks:
     ```python
     def callback(ch, method, properties, body):
       data = json.loads(body)
       result = process_data(data)
       # Optionally send result to another queue
     ```

### 5. Testing and Documentation

1. **Test New Features:**
   - Use Postman or similar tools to test new API endpoints.
   - Ensure ML models are correctly processing and returning results by testing RabbitMQ workers.

2. **Update Documentation:**
   - Document new API endpoints and features in `docs/API.md`.
   - Update `docs/ML_documentation.md` with information about new ML models and their usage.

3. **Maintain Code Quality:**
   - Ensure all new code is well-commented and adheres to the project's coding standards.
   - Run unit and integration tests to validate functionality.

## Troubleshooting

- **Check Logs:** Look at server and RabbitMQ logs for errors or warnings.
- **Validate Configurations:** Ensure environment variables, database connections, and RabbitMQ settings are correct.
- **Debugging:** Use debugging tools and logs to trace issues in your code.

## Conclusion

This guide provides a detailed approach to adding functionality to the CareerQuest project, from setting up new API endpoints to integrating ML models and RabbitMQ. Follow these steps to ensure smooth development and integration, and refer to the project documentation for additional information.
