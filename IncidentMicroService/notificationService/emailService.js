const axios = require('axios');

const MAILTRAP_API_TOKEN = '361c06935085c2694d0ea0eb8aa17139'; // ✅ Your token
const FROM_EMAIL = 'hello@demomailtrap.co';
const TO_EMAIL = 'usbgmedia@gmail.com'; // ✅ Your recipient email

async function sendIncidentEmail(incident) {
  try {
    const response = await axios.post(
      'https://send.api.mailtrap.io/api/send',
      {
        from: {
          email: FROM_EMAIL,
          name: 'Incident Alert System'
        },
        to: [
          {
            email: TO_EMAIL
          }
        ],
        subject: '🚨 New Incident Reported',
        html: `
          <h2>Incident Notification</h2>
          <p><strong>Property ID:</strong> ${incident.propertyId}</p>
          <p><strong>Description:</strong> ${incident.description}</p>
        `
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("📧 Email sent successfully!", response.data);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
}

module.exports = { sendIncidentEmail };
