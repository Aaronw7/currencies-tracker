const express = require('express')
const cors = require('cors');
const sequelize = require('./database');
const routes = require('./routes');
const scheduleFetchCurrencyData = require('./tasks/fetchCurrencyData');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

// Routes
app.use('/currency', routes);

app.get('/keep-alive', (req, res) => {
  res.send('Server is alive!');
});

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    scheduleFetchCurrencyData();
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
