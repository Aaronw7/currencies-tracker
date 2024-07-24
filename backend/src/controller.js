const Currency = require("./models/Currency");
const asyncHandler = require("express-async-handler");

// get latest currency
exports.getLatestCurrencies = asyncHandler(async (req, res, next) => {
  try {
    const latestData = await Currency.findOne({
      order: [['date', 'DESC']],
    });
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});