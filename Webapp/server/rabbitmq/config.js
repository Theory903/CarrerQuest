// Webapp/server/rabbitmq/config.js

import { connect } from "amqplib";

const connectRabbitMQ = async () => {
  try {
    const connection = await connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
};

export default connectRabbitMQ;
