import { connect } from "amqplib/callback_api";

// Function to send message to RabbitMQ
function sendToQueue(data) {
  connect("amqp://localhost", function (err, connection) {
    if (err) {
      throw err;
    }
    connection.createChannel(function (err, channel) {
      if (err) {
        throw err;
      }
      const queue = "task_queue";
      channel.assertQueue(queue, { durable: true });

      const msg = JSON.stringify(data);
      channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
      console.log(" [x] Sent '%s'", msg);

      // Close connection after a delay
      setTimeout(function () {
        connection.close();
      }, 500);
    });
  });
}

export default { sendToQueue };
