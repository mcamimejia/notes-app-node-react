const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Note = require('./note');
const Tag = require('./tag');

const NoteTag = sequelize.define('NoteTag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  noteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Note,
      key: 'id',
    },
    allowNull: false,
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
    allowNull: false,
  }
});

Note.belongsToMany(Tag, { through: NoteTag, foreignKey: 'noteId', onDelete: 'CASCADE' });
Tag.belongsToMany(Note, { through: NoteTag, foreignKey: 'tagId' });

module.exports = NoteTag;
