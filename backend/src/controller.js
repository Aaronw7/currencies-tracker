const { Op } = require('sequelize');
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

exports.getPreviousCurrency = asyncHandler(async (req, res, next) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
  const specificDate = new Date('2024-07-24T00:32:44.54Z');

  try {
    const data = await Currency.findOne({
      where: {
        date: {
          [Op.lte]: pastDate,
        },
      },
      order: [['date', 'ASC']]
    });

    if (data) {
      res.json(data['dataValues']);
    } else {
      const specificData = await Currency.findOne({
        where: {
          date: specificDate
        },
      });

      if (specificData) {
        res.json(specificData['dataValues']);
      } else {
        res.status(404).json({ message: 'No data found for the specified date' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})