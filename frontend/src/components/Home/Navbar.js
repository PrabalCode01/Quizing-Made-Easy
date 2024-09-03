import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthForms from '../Auth/AuthForms';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token and set username
      setAuth({ isAuthenticated: true, username: 'User' });
    }
  }, [setAuth]);

  const toggleModal = () => setShowModal(!showModal);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, username: '' });
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">Quizing Made Easy</Link>
          </div>
          <div className="block lg:hidden">
            <button 
              onClick={toggleSidebar} 
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:w-auto w-full space-x-4">
            <Link to="/create" className="hover:underline">Create a Quiz</Link>
            <Link to="/quiz" className="hover:underline">Take a Quiz</Link>
            <Link to="/result" className="hover:underline">Results</Link>

            {auth.isAuthenticated ? (
              <>
                <span className="mr-4">Hello, {auth.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded"
                onClick={toggleModal}
              >
                Login
              </button>
            )}

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-500" onClick={toggleModal}>
                      &#x2715;
                    </button>
                  </div>
                  <AuthForms toggleModal={toggleModal} setAuth={setAuth} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar 
       isOpen={isOpen} 
       onClose={closeSidebar} 
       isAuthenticated={auth.isAuthenticated} 
       handleLogout={handleLogout} 
      />
    </>
  );
};

export default Navbar;
