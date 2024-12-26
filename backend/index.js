require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
const cors = require('cors');

app.use(cors({ origin: process.env.UI_URL }));

app.use(bodyParser.json());

app.use('/api', noteRoutes);
app.use('/api', userRoutes);
app.use('/api', tagRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
