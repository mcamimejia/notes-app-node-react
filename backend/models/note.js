const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Tag = require('./tag');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
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
  },
  content: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Note.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Note, { foreignKey: 'userId' });

module.exports = Note;
