import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/dashboard" className="font-bold text-xl">🔗 Link Saver</Link>
      <div>
        {isLoggedIn() ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
