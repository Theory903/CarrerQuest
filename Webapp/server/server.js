import express, { json } from "express";
import { sendToQueue } from "./rabbitmq/producer"; // Import the RabbitMQ producer

const app = express();
app.use(json());

app.post("/predict", (req, res) => {
  const requestData = req.body;

  // Send the data to RabbitMQ
  sendToQueue(requestData);

  res.status(200).send("Prediction request sent to queue.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
