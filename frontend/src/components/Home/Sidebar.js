import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose , isAuthenticated, handleLogout }) => {
  const sidebarClasses = isOpen ? 'translate-x-0' : 'translate-x-full';

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white text-black transform transition-transform ease-in-out duration-300 ${sidebarClasses}`}>
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">Menu</div>
        <button 
          onClick={onClose} 
          className="text-black focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          <li><Link to="/create" onClick={onClose} className="block hover:underline">Create a Quiz</Link></li>
          <li><Link to="/quiz" onClick={onClose} className="block hover:underline">Take a Quiz</Link></li>
          <li><Link to="/result" onClick={onClose} className="block hover:underline">Results</Link></li>
          <li>
             {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
            >
              Logout
            </button>
             )}
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
