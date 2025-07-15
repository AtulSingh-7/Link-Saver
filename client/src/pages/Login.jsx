import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../authContext';
import Signup from './Signup';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login,isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    if(localStorage.getItem('token')){
      navigate('/dashboard');
    }
    else{
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });


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
      if (!token) {
        alert('Login failed: No token received.');
        return;
      }
      login(token); // save to context + localStorage
      // sleep for 1 second
      await new Promise((r) => setTimeout(r, 1000));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
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
      {/* <Signup /> */}

      <p className='text-sm mt-2 mt-10 font-bold'> Note : Server is hosted on render(free tier ) and takes time to start on first request , Please wait for 1-2 minutes   </p>
      <p className='text-sm mt-2 font-bold'>
        Thank you for the patience !
      </p>
    </div>
  );
}

export default Login;
