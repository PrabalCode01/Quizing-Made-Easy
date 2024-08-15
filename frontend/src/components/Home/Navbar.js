import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
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
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isOpen} onClose={closeSidebar} />

     
    </>
  );
};

export default Navbar;
