const express = require("express");
const router = express.Router();
const { getLatestCurrencies, getCurrenciesForPeriod } = require('./controller');

// Grab latest currency data from database
router.get('/latest', getLatestCurrencies);

module.exports = router;
