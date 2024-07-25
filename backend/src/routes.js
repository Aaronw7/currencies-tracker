const express = require("express");
const router = express.Router();
const { getLatestCurrencies, getPreviousCurrency } = require('./controller');

// Grab latest currency data from database
router.get('/latest', getLatestCurrencies);

// Grab previous currency data from database
router.get('/previous', getPreviousCurrency)

module.exports = router;
