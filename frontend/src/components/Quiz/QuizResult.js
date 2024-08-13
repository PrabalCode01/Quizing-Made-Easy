import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        {score !== undefined ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Quiz Result</h1>
            <p className="text-lg text-gray-700 mb-6">
              {score >= total / 2 ? 'Great job!' : 'Better luck next time!'} Your Score: <span className="font-semibold">{score}</span> / {total}
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                Take Another Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">No Quiz Attempted</h1>
            <p className="text-gray-700 mb-6">You have not given any quiz yet.</p>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Take a Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
