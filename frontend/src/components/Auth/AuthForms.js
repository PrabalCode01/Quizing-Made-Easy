import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AuthModal = ({ toggleModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted'); // Check if this log appears
  
    try {
      if (isLogin) {
        console.log('Logging in');
        const res = await axios.post('/api/auth/login', { email, password });
        console.log('Login successful', res.data);
        localStorage.setItem('token', res.data.token);
        setAuth({ isAuthenticated: true, username: res.data.username });
      } else {
        console.log('Registering user');
        const res = await axios.post('/api/auth/register', { username, email, password });
        console.log('Registration successful', res.data);
        setIsLogin(true);
      }
      toggleModal(); // Close the modal after success
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={toggleModal}
        >
          &#x2715; {/* This is the "X" character */}
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          className="text-blue-600 text-sm mt-4"
          onClick={toggleForm}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;