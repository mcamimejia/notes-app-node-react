const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { userName, password } = req.body.data;
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({ userName, password: hashPassword, createdAt: new Date(), updatedAt: new Date() });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, password } = req.body.data;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.userName = userName || user.userName;
    user.password = bcrypt.hash(password, 10) || user.password;
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body.data;
    const userToLogin = await User.findOne(
      {where: 
        { userName: userName.trim()}
      }
    );
    if (!userToLogin) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, userToLogin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: userToLogin.id, userName: userToLogin.userName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'User logged in successfully', token, userId: userToLogin.id});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};