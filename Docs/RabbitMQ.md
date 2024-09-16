# CareerQuest - RabbitMQ Integration Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Setup Instructions](#setup-instructions)
5. [File Structure](#file-structure)
6. [Node.js (Producer) Setup](#nodejs-setup)
7. [Python ML Worker (Consumer) Setup](#python-worker-setup)
8. [Running the System](#running-the-system)
9. [Testing the Integration](#testing-the-integration)
10. [Monitoring RabbitMQ](#monitoring-rabbitmq)
11. [Troubleshooting](#troubleshooting)
12. [Future Improvements](#future-improvements)

---

## 1. Overview

The **CareerQuest** platform uses RabbitMQ to asynchronously communicate between the Node.js backend (Producer) and Python-based Machine Learning (ML) models (Consumer). This setup allows the platform to handle user requests efficiently by decoupling the frontend and backend systems and enabling asynchronous task processing.

---

## 2. System Architecture

### Components Involved:
1. **Frontend (React)**: Sends prediction requests (e.g., career recommendations) to the Node.js backend.
2. **Node.js Backend (Producer)**: Receives requests from the frontend, processes them, and submits tasks to RabbitMQ.
3. **RabbitMQ**: Acts as the message broker for task queues. It ensures that tasks are delivered to workers (Python ML Worker) in a reliable, asynchronous manner.
4. **Python ML Worker (Consumer)**: Consumes tasks from RabbitMQ, runs machine learning models, and sends the result back to the Node.js backend.

---

## 3. Technology Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Task Queue**: RabbitMQ
- **Machine Learning**: Python (scikit-learn, pandas, etc.)
- **Database**: MongoDB
- **Environment**: Docker (optional for RabbitMQ deployment)

---

## 4. Setup Instructions

### 4.1 Install RabbitMQ

#### **macOS**:
```bash
brew install rabbitmq
brew services start rabbitmq
```

#### **Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

#### **Windows**:
- Download and install RabbitMQ from the official website: https://www.rabbitmq.com/install-windows.html.

---

### 5. File Structure

Here is the file structure for the project:

```plaintext
CareerQuest/
│── docs/
│   ├── ML_documentation.md
│   ├── Git_guide.md
│   ├── RabbitMQ.md
│   ├── UI.md
│   ├── Usage_Instruction.md
│
├── ML/
│   ├── models/
│   ├── data/
│   ├── notebooks/
│   ├── scripts/
│   ├── worker.py
│   ├── preprocessing.py
│   ├── prediction.py
│   └── requirements.txt
│
├── Webapp/
│   ├── src/
│   │   ├── app/
│   │   │   ├── fonts/
│   │   │   ├── mentorships/
│   │   │   ├── students/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── Dashboard/
│   │       │   ├── AcademicPerformanceLineChart.tsx
│   │       │   ├── AcademicPerformanceStackedBarChart.tsx
│   │       │   ├── CareerInterestRadar.tsx
│   │       │   ├── CareerTree.tsx
│   │       │   ├── GoalProgressTracker.tsx
│   │       │   ├── ParticipationDonutChart.tsx
│   │       │   ├── PersonalityRadarChart.tsx
│   │       │   ├── ReflectionTimeline.tsx
│   │       │   ├── SkillMatrix.tsx
│   │       │   └── StrengthsWeaknessesBarChart.tsx
│   │       ├── BadgeDisplay.tsx
│   │       ├── CareerTree.tsx
│   │       ├── CTAButton.tsx
│   │       ├── Footer.tsx
│   │       ├── HeroSection.tsx
│   │       ├── Layout.tsx
│   │       ├── Leaderboard.tsx
│   │       ├── MentorCard.tsx
│   │       ├── Navbar.tsx
│   │       ├── QuizCard.tsx
│   │       └── ResourceCard.tsx
│   ├── public/
│   └── server/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
│
├── .gitignore
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

---

## 6. Node.js (Producer) Setup

1. Navigate to the backend folder:
   ```bash
   cd CareerQuest/Webapp/server
   ```

2. Install dependencies:
   ```bash
   npm install express amqplib mongoose
   ```

3. In the `server.js`, ensure RabbitMQ is properly connected:

   **Example `server.js`**:
   ```javascript
   const amqp = require('amqplib/callback_api');

   // Connect to RabbitMQ
   amqp.connect('amqp://localhost', (err, connection) => {
     if (err) {
       throw err;
     }
     connection.createChannel((err, channel) => {
       if (err) {
         throw err;
       }
       const queue = 'task_queue';
       channel.assertQueue(queue, { durable: true });

       // Handle requests from frontend
       app.post('/predict', (req, res) => {
         const msg = JSON.stringify(req.body);
         channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
         res.status(200).send('Prediction task queued');
       });
     });
   });

   // Express server setup
   const express = require('express');
   const app = express();
   app.use(express.json());
   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

---

## 7. Python ML Worker (Consumer) Setup

1. Navigate to the ML folder:
   ```bash
   cd CareerQuest/ML
   ```

2. (Optional) Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create the worker script (`worker.py`) in the `scripts/` folder:

   **Example `worker.py`**:
   ```python
   import pika
   import json
   from prediction import run_prediction  # Import your prediction logic

   def callback(ch, method, properties, body):
       data = json.loads(body)
       result = run_prediction(data)
       print(f"Processed result: {result}")
       ch.basic_ack(delivery_tag=method.delivery_tag)

   connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
   channel = connection.channel()
   channel.queue_declare(queue='task_queue', durable=True)

   channel.basic_qos(prefetch_count=1)
   channel.basic_consume(queue='task_queue', on_message_callback=callback)

   print('Waiting for messages. To exit, press CTRL+C')
   channel.start_consuming()
   ```

5. Start the Python worker:
   ```bash
   python scripts/worker.py
   ```

---

## 8. Running the System

1. **Start RabbitMQ**:
   ```bash
   sudo systemctl start rabbitmq-server   # Linux
   brew services start rabbitmq           # macOS
   ```

2. **Start Node.js Backend**:
   ```bash
   cd CareerQuest/Webapp/server
   node server.js
   ```

3. **Start Python ML Worker**:
   ```bash
   cd CareerQuest/ML
   python scripts/worker.py
   ```

---

## 9. Testing the Integration

1. Send a **POST** request from the frontend (or Postman) to the Node.js backend at:
   ```
   POST http://localhost:3000/predict
   Body (JSON):
   {
     "user_id": 123,
     "input_data": [feature_values]
   }
   ```

2. Monitor the RabbitMQ management console at `http://localhost:15672` to verify that the message is sent to the `task_queue`.

3. The Python worker will consume the message, process the prediction, and output the result.

---

## 10. Monitoring RabbitMQ

Access the **RabbitMQ management dashboard**:
- **URL**: http://localhost:15672
- **Username**: guest
- **Password**: guest

From here, you can monitor task queues, consumers, and message statistics.

---

## 11. Troubleshooting

1. **Connection Refused**: Ensure that RabbitMQ is running by checking its status:
   ```bash
   sudo systemctl status rabbitmq-server   # Linux
   brew services list                      # macOS
   ```

2. **Task Stuck in Queue**: Check the Python worker logs to ensure that it's connected to RabbitMQ and consuming tasks correctly.

3. **Dependency Issues**: Double-check the dependencies in the `requirements.txt` or `package.json`.

---

## 12. Future Improvements

- **Task Retry Mechanism**: Implement retry logic for failed tasks in RabbitMQ to ensure fault tolerance.
- **Dockerization**: Dockerize the entire system for easier deployment and scalability.
- **Result Storage**: Store the results of predictions in a database like MongoDB for future analysis.

---

This documentation should provide a comprehensive guide to integrating RabbitMQ in your **CareerQuest** project. Follow each section carefully to ensure a successful setup and smooth operation of the system.
