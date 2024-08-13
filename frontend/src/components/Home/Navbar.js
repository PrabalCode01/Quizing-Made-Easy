import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import LoginModal from '../Auth/LoginModal';
import LogoutButton from '../Auth/Logout';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check for user data in local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false); // Close the dropdown after logging out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            {user ? (
              <div className="relative">
                <div 
                  onClick={toggleDropdown} 
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full" />
                  <span>{user.name}</span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    <LogoutButton onLogout={handleLogout} />
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setIsModalOpen(true)}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isOpen} onClose={closeSidebar} />

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        setUser={setUser} 
      />
    </>
  );
};

export default Navbar;
