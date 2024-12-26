const express = require('express');
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-tag', authMiddleware.authToken, tagController.createTag);
router.get('/tags', authMiddleware.authToken, tagController.getTags);
router.get('/tags/users/:userId', authMiddleware.authToken, tagController.getTagsByUser);
router.put('/tags/:id', authMiddleware.authToken, tagController.updateTag);
router.delete('/tags/:id', authMiddleware.authToken, tagController.deleteTag);

module.exports = router;
