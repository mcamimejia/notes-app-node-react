const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
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
  userName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
});


module.exports = User;
