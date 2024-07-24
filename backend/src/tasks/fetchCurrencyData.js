const axios = require('axios');
const cron = require('node-cron');
const Currency = require('../models/Currency');
require('dotenv').config();

const fetchCurrencyData = async () => {
  try {
    const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
      params: {
        apikey: process.env.FREECURRENCYAPI_KEY,
      },
    });
    console.log('this is the response: ', response.data); // Log the entire response to understand its structure
    const data = response.data.data;
    await Currency.create({
      date: new Date(),
      rates: data,
    });
    console.log('Currency data updated');
  } catch (error) {
    console.error('Failed to fetch currency data', error);
  }
};

const scheduleFetchCurrencyData = () => {
  // Schedule to run once a day at midnight
  cron.schedule('0 0 * * *', fetchCurrencyData);
  fetchCurrencyData(); // Fetch immediately on startup
};

module.exports = scheduleFetchCurrencyData;
