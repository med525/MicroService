const amqp = require('amqplib');
const { sendIncidentEmail } = require('./emailService');

const QUEUE_NAME = 'incident_notifications';

async function startConsumer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const incident = JSON.parse(msg.content.toString());
        console.log("📥 Received incident:", incident);
        await sendIncidentEmail(incident);
        channel.ack(msg);
      }
    });

    console.log(`📡 Listening for incident messages on '${QUEUE_NAME}'`);
  } catch (err) {
    console.error("❌ Failed to start consumer:", err.message);
  }
}

startConsumer();
