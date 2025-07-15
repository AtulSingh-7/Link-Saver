import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import BookmarkCard from '../components/BookmarkCard';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchBookmarks = async () => {
    const res = await API.get('/bookmarks');
    setBookmarks(res.data);
  };


  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const res = await API.post('/bookmarks', { url });
      setBookmarks([res.data, ...bookmarks]);
      setUrl('');
    } catch (err) {
      alert('Failed to save bookmark');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/bookmarks/${id}`);
    setBookmarks(bookmarks.filter((b) => b._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Save a New Link</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="url"
            placeholder="Paste a URL"
            className="flex-grow p-2 border rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>

        <div className="grid gap-4">
          {bookmarks.map((b) => (
            <BookmarkCard key={b._id} bookmark={b} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
