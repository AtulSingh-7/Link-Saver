import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../authContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const res = await API.post('/auth/register', { email, password });

      
      if (res.status === 201 && res.data.token) {
        login(res.data.token);         // ✅ set token in localStorage
        
        // Add a small delay to ensure token is properly stored
        await new Promise(resolve => setTimeout(resolve, 100));
        
        navigate('/dashboard');        // ✅ go to dashboard
      } else {
        alert('Signup succeeded but no token received.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }

  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
      <p className='text-sm mt-2 mt-10 font-bold'> Note : Server is hosted on render(free tier ) and takes time to start on first request , Please wait for 1-2 minutes   </p>
      <p className='text-sm mt-2 font-bold'>
        Thank you for the patience !
      </p>
    </div>
  );
}

export default Signup;
