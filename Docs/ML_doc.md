# MLDOC.md: Machine Learning Model Documentation for Career Quest

---

## 1. Introduction

### 1.1 Overview

This document provides a detailed guide for developers to build, train, and integrate machine learning (ML) models within the **Career Quest** platform. The ML model is critical for analyzing quiz data and delivering personalized career recommendations.

### 1.2 Objective

To develop a model that processes user quiz data (interests, strengths, personality traits) and generates tailored career guidance.

---

## 2. System Architecture

### 2.1 Components

- **Frontend**:
  - User interface where quizzes are taken and career paths explored.

- **Backend (Node.js)**:
  - Manages API requests, database interactions (MongoDB), and communicates with the ML model via RabbitMQ.

- **Machine Learning Model (Python)**:
  - Analyzes quiz data and generates career recommendations asynchronously using RabbitMQ.

- **Message Queue (RabbitMQ)**:
  - Facilitates asynchronous communication between the Node.js backend and Python ML service.

---

## 3. Model Architecture

### 3.1 Model Selection

- **Algorithm Choices**:
  - **Decision Trees/Random Forests**: For straightforward classifications.
  - **Neural Networks**: For complex patterns and feature interdependencies.

### 3.2 Data Preparation

- **Inputs**:
  - Quiz results including interests, strengths, and personality traits.
  - Data types: Numerical or categorical.

- **Feature Engineering**:
  - **Interest Scores**: Convert qualitative interests into numerical values.
  - **Personality Traits**: Encode qualitative traits into numerical features.

### 3.3 Model Outputs

- **Career Suggestions**: Ranked list of suitable careers.
- **Recommended Skills**: Skills necessary for recommended careers.

---

## 4. Training Process

### 4.1 Dataset Preparation

- **Data Sources**:
  - Anonymized user quiz data or public career datasets.

- **Preprocessing**:
  - Clean and normalize data, handle missing values.

### 4.2 Model Training

- **Data Formatting**:
  - Prepare quiz results for training (e.g., CSV).

- **Training Steps**:
  - Split data into **training** and **test** sets (80/20).
  - Apply **data augmentation** if needed.

### 4.3 Hyperparameters

- **Learning Rate**: 0.01
- **Batch Size**: 32
- **Epochs**: 50

### 4.4 Evaluation Metrics

- **Accuracy**: Overall classification performance.
- **Precision & Recall**: Relevance of career suggestions.
- **F1-Score**: Balance between precision and recall.

---

## 5. Integration with Backend

### 5.1 Communication with RabbitMQ

- **Data Flow**:
  - Node.js sends quiz data to RabbitMQ.
  - RabbitMQ forwards data to the Python ML model.
  - The model processes data and returns career suggestions via RabbitMQ.

### 5.2 Asynchronous Processing

- Utilizes RabbitMQ for non-blocking task handling and response management.

### 5.3 Code Examples

- **Node.js Sending Task**:
  ```javascript
  const sendToQueue = (quizResults) => {
    const queue = 'career_suggestions';
    rabbitChannel.sendToQueue(queue, Buffer.from(JSON.stringify(quizResults)));
  };
  ```

- **Python Receiving Task**:
  ```python
  import pika
  import json

  def process_message(ch, method, properties, body):
      quiz_data = json.loads(body)
      career_suggestions = model.predict(quiz_data)
      ch.basic_publish(exchange='', routing_key='results_queue', body=json.dumps(career_suggestions))
  ```

---

## 6. Deployment

### 6.1 Python Model Setup

- **Environment Setup**:
  - Install libraries: `pip install scikit-learn tensorflow pika`

- **RabbitMQ Configuration**:
  - Ensure proper setup for communication between Node.js and Python.

### 6.2 Scaling

- Deploy the model on scalable platforms (e.g., AWS Lambda, Google Cloud Functions) to handle increased user loads.

---

## 7. Dependencies

### 7.1 Python Libraries

- `scikit-learn` for traditional models.
- `TensorFlow/PyTorch` for neural networks.
- `pandas` for data manipulation.
- `numpy` for numerical operations.
- `pika` for RabbitMQ communication.

### 7.2 Node.js Libraries

- `Express` for API management.
- `Mongoose` for MongoDB.
- `amqplib` for RabbitMQ integration.

---

## 8. API Reference

### 8.1 Send Quiz Data to ML Model

- **POST /quiz-results**:
  ```json
  {
    "userId": "12345",
    "quizResults": {
      "interestScores": [4, 3, 5, 1],
      "personalityTraits": [1, 0, 0, 1],
      "skills": [3, 2, 4]
    }
  }
  ```

### 8.2 Retrieve Career Suggestions

- **GET /career-suggestions/{userId}**:
  ```json
  {
    "careerSuggestions": ["Software Engineer", "Data Analyst"],
    "recommendedSkills": ["Python", "Data Science"]
  }
  ```

---

## 9. Usage Examples

### 9.1 Node.js Backend Example

```javascript
sendToQueue({
  userId: '12345',
  quizResults: { interestScores: [3, 4, 5], personalityTraits: [1, 1, 0], skills: [2, 3, 4] }
});
```

### 9.2 Python ML Model Example

```python
def process_data(quiz_data):
    return model.predict(quiz_data)
```

---

## 10. Troubleshooting

- **Timeout Issues**: Check RabbitMQ timeout settings.
- **Data Format Mismatch**: Ensure quiz data is formatted correctly.
- **Scaling**: Adjust cloud service settings to handle demand.

---

## 11. Further Reading

- **RabbitMQ Documentation**: [RabbitMQ Docs](https://www.rabbitmq.com/documentation.html)
- **Scikit-learn**: [Scikit-learn Docs](https://scikit-learn.org/stable/)
- **TensorFlow**: [TensorFlow Docs](https://www.tensorflow.org/)
- **Node.js**: [Node.js Docs](https://nodejs.org/en/docs/)
