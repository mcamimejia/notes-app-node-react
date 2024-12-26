const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', userController.login);
router.post('/create-user', userController.createUser);
router.get('/users/:id', authMiddleware.authToken, userController.getUserById);
router.put('/users/:id', authMiddleware.authToken, userController.updateUser);
router.delete('/users/:id', authMiddleware.authToken, userController.deleteUser);

module.exports = router;
