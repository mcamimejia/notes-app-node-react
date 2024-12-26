const sequelize = require('../config/database');
const User = require('./user');
const Note = require('./note');
const Tag = require('./tag');
const NoteTag = require('./notetag');

module.exports = {
  sequelize,
  User,
  Note,
  Tag,
  NoteTag,
};
