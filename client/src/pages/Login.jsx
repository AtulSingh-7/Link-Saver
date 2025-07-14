import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { setToken } from '../auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const res = await API.post('/auth/login', { email, password });
      console.log(res);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
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
      <p className="text-sm mt-2">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-500 underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}

export default Login;
