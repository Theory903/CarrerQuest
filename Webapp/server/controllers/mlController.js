// Webapp/server/controllers/mlController.js

import sendToQueue from "../rabbitmq/producer";

// Function to handle prediction request
const requestPrediction = async (req, res) => {
  const userData = req.body;

  try {
    await sendToQueue("task_queue", userData); // Send user data to RabbitMQ
    res.status(202).json({ message: "Task submitted to RabbitMQ" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit task" });
  }
};

export default { requestPrediction };
