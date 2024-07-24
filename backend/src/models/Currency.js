const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Currency = sequelize.define('Currency', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rates: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Currency;