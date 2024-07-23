const express = require('express')
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
