require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'sqlite', 
    storage: './database.sqlite', 
    logging: true, 
  }
);

sequelize.query('PRAGMA foreign_keys = ON');

module.exports = sequelize;
