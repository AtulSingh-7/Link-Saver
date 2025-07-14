const express = require('express');
const { createBookmark, getBookmarks, deleteBookmark } = require('../controllers/bookmarkController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createBookmark);
router.get('/', auth, getBookmarks);
router.delete('/:id', auth, deleteBookmark);

module.exports = router;
