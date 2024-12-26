const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Note = require('./note');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
});



module.exports = Tag;
