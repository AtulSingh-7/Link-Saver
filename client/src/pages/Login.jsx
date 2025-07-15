import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { setToken } from '../auth';
import Signup from './Signup';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // setLoading(true);
  
    try {
      const res = await API.post('/auth/login', { email, password });
  
      // Defensive: Check status code
      if (res.status !== 200) {
        throw new Error('Unexpected response status');
      }
  
      let token = res?.data?.token;
  
      // If token is missing, wait max 2s for it
      if (!token) {
        const start = Date.now();
        while (!token && Date.now() - start < 10000) {
          await new Promise((r) => setTimeout(r, 100));
          token = res?.data?.token;
        }
      }
  
      // Still no token after waiting?
      if (!token) {
        alert('Login failed: Token missing from server.');
        return;
      }
  
      // Token received — continue
      setToken(token);
      navigate('/dashboard');
  
    } catch (err) {
      console.error('Login error:', err);
  
      // Handle error from backend response
      if (err.response?.status === 401) {
        alert('Incorrect email or password.');
      } else {
        alert(err.response?.data?.message || err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
      {/* <p className="text-sm mt-2">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-500 underline">
          Sign up here
        </a>
      </p> */}
      <Signup />
    </div>
  );
}

export default Login;
