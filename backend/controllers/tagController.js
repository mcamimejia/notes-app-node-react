const { Tag, Note } = require('../models');


exports.createTag = async (req, res) => {
  try {
    const { name } = req.body.data;
    const tag = await Tag.create({ name, createdAt: new Date(), updatedAt: new Date() });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTagsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await Note.findAll({
      where: {
        userId: userId
      },
      include: {
        model: Tag,
        through: { attributes: [] } 
      }
    });

    if (!notes.length) {
      return res.status(404).json({ message: 'No notes relationship found for this user' });
    }

    const tags = notes.flatMap(note => note.Tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt
    })));

    const uniqueTags = Array.from(new Set(tags.map(tag => tag.id)))
      .map(id => tags.find(tag => tag.id === id));

    res.status(200).json(uniqueTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body.data;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    tag.name = name || tag.name;
    tag.updatedAt = new Date();

    await tag.save();

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    
    await tag.setNotes([]); 

    
    await tag.destroy();

    res.status(200).json({ message: 'Tag deleted successfully with all associations' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
