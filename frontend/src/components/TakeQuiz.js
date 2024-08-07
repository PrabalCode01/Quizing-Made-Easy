import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get('/api/quizzes');
        console.log(data);
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8 mt-8">Available Quizzes</h1>
      <div className="max-w-4xl mx-auto">
        {quizzes.length > 0 ? (
          <ul className="space-y-4">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.questions.length} questions</p>
                <Link
                  to={`/take-quiz/${quiz._id}`}
                  className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Take Quiz
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p className="text-gray-700 mb-4">No quizzes available.</p>
            <Link
              to="/create"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create a Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
