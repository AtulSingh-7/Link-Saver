const Bookmark = require('../models/Bookmark');
const fetchMetaData = require('../utils/fetchMetaData');

exports.createBookmark = async (req, res) => {
  const { url, tags } = req.body;
  const userId = req.userId;

  try {
    const { title, favicon, summary } = await fetchMetaData(url);

    const bookmark = await Bookmark.create({
      userId,
      url,
      title,
      favicon,
      summary,
      tags: tags || []
    });

    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error saving bookmark', error: err.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
  }
};

exports.deleteBookmark = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Bookmark.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Bookmark not found' });

    res.status(200).json({ message: 'Bookmark deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bookmark', error: err.message });
  }
};
