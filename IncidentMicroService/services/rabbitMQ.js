const amqp = require('amqplib');

let channel, connection;
const QUEUE_NAME = 'incident_notifications';

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
  } catch (error) {
    console.error("❌ RabbitMQ connection failed:", error.message);
  }
}

function publishIncidentMessage(message) {
  if (channel) {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
    console.log("📨 Incident message sent to queue.");
  }
}

module.exports = { connectRabbitMQ, publishIncidentMessage };
