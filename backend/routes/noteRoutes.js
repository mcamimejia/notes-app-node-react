const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-note', authMiddleware.authToken, noteController.createNote);
router.get('/notes/user/:userId', authMiddleware.authToken, noteController.getNotesByUser);
router.get('/notes/user/:userId/archived', authMiddleware.authToken, noteController.getNotesByUserArchived);
router.get('/notes/user/:userId/tag/:tagId', authMiddleware.authToken, noteController.getNotesByUserAndTag);
router.put('/update-note/:id', authMiddleware.authToken, noteController.updateNote);
router.put('/update-note/:id/archive', authMiddleware.authToken, noteController.archiveNote);
router.delete('/note/:id', authMiddleware.authToken, noteController.deleteNote);
router.post('/note/:id/tags', authMiddleware.authToken, noteController.assignTagsToNote);

module.exports = router;
