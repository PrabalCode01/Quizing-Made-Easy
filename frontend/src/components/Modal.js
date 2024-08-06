import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="text-xl font-bold mb-4">Menu</div>
        <ul className="space-y-2">
          <li><a href="/create" className="text-blue-600 hover:underline">Create a Quiz</a></li>
          <li><a href="/quiz" className="text-blue-600 hover:underline">Take a Quiz</a></li>
          <li><a href="/result" className="text-blue-600 hover:underline">Results</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Modal;
