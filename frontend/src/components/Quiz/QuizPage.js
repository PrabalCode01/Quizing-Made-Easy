import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`/api/quizzes/${id}`);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (qIndex, oIndex) => {
    setAnswers({ ...answers, [qIndex]: oIndex });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswers = quiz.questions.filter(
      (q, qIndex) => q.options[answers[qIndex]]?.isCorrect
    ).length;
    navigate('/result', { state: { score: correctAnswers, total: quiz.questions.length } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      {quiz ? (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">{quiz.title}</h1>
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{question.questionText}</h2>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-gray-700">{option.text}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-700">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
