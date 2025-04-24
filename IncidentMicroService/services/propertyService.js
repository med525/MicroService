const axios = require("axios");

async function validatePropertyExists(propertyId, token) {
  try {
    const response = await axios.get(`http://localhost:8090/properties/${propertyId}`, {
      headers: {
        Authorization: token
      }
    });
    return response.status === 200;
  } catch (err) {
    console.error("❌ Property validation failed:", err.response?.data || err.message);
    return false;
  }
}

module.exports = { validatePropertyExists };
