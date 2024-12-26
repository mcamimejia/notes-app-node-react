const { Note, Tag, NoteTag } = require('../models');

exports.createNote = async (req, res) => {
  try {
    const { userId, name, content, tags } = req.body.data;

    const note = await Note.create({
      userId,
      name,
      content,
      archived: false, 
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if (tags && tags.length > 0) {
      const tagRecords = await Tag.findAll({
        where: { id: tags }
      });
      await note.setTags(tagRecords);
    }

    const noteWithTags = await Note.findByPk(note.id, {
      include: Tag
    });

    res.status(200).json(noteWithTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.findAll({ where: { userId: userId, archived: false }, include: Tag });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotesByUserArchived = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.findAll({ where: { userId: userId, archived: true }, include: Tag });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotesByUserAndTag = async (req, res) => {
  try {
    const { userId, tagId } = req.params;
    const notes = await Note.findAll({
      where: { userId },
      include: {
        model: Tag,
        where: { id: tagId }
      }
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, tags } = req.body.data;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.name = name || note.name;
    note.content = content || note.content;
    note.updatedAt = new Date();

    await note.save();

    if (tags && tags.length) {
      const tagRecords = await Tag.findAll({ where: { id: tags } });
      await note.setTags(tagRecords);
    }

    const noteWithTags = await Note.findByPk(note.id, {
      include: Tag
    });

    res.status(200).json(noteWithTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body.data;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.archived = archived;
    note.updatedAt = new Date();
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignTagsToNote = async (req, res) => {
  try {
    const { id } = req.params; 
    const { tags } = req.body.data; 

    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    
    const tagRecords = await Tag.findAll({ where: { id: tags } });
    
    
    await note.setTags(tagRecords);

    res.status(200).json({ message: 'Tags assigned to note successfully', note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
