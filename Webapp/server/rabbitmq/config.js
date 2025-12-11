import amqp from 'amqplib';

let connection = null;
let channel = null;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = process.env.RABBITMQ_QUEUE || 'careerquest_tasks';

// Connect to RabbitMQ
export const connectRabbitMQ = async () => {
  try {
    if (connection) return channel;

    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    // Assert queues
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.assertQueue('ai_tasks', { durable: true });
    await channel.assertQueue('report_tasks', { durable: true });

    console.log('✅ Connected to RabbitMQ');
    
    // Handle connection errors
    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
      connection = null;
      channel = null;
    });

    connection.on('close', () => {
      console.log('RabbitMQ connection closed');
      connection = null;
      channel = null;
    });

    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    console.log('⚠️ RabbitMQ not available - running without message queue');
    return null;
  }
};

// Get channel
export const getChannel = () => channel;

// Publish message to queue
export const publishToQueue = async (queueName, message) => {
  try {
    const ch = await connectRabbitMQ();
    if (!ch) {
      console.log('RabbitMQ not available, processing synchronously');
      return false;
    }

    await ch.assertQueue(queueName, { durable: true });
    ch.sendToQueue(
      queueName, 
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    
    console.log(`📤 Message published to ${queueName}`);
    return true;
  } catch (error) {
    console.error('Failed to publish message:', error);
    return false;
  }
};

// Consume messages from queue
export const consumeFromQueue = async (queueName, handler) => {
  try {
    const ch = await connectRabbitMQ();
    if (!ch) return;

    await ch.assertQueue(queueName, { durable: true });
    ch.prefetch(1);

    ch.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await handler(content);
          ch.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          ch.nack(msg, false, false); // Don't requeue failed messages
        }
      }
    });

    console.log(`🔄 Consuming from ${queueName}`);
  } catch (error) {
    console.error('Failed to consume messages:', error);
  }
};

// Close connection
export const closeConnection = async () => {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    console.log('RabbitMQ connection closed');
  } catch (error) {
    console.error('Error closing RabbitMQ connection:', error);
  }
};

export default {
  connectRabbitMQ,
  getChannel,
  publishToQueue,
  consumeFromQueue,
  closeConnection
};
