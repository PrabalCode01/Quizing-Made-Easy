import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ text: '', isCorrect: false }] }]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = questions.slice();
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = questions.slice();
    newQuestions[qIndex].options[oIndex][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }]);
  };

  const handleAddOption = (index) => {
    const newQuestions = questions.slice();
    newQuestions[index].options.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuiz = { title, questions };
    await axios.post('/api/quizzes', newQuiz);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-8">Create Quiz</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz Title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="space-y-4">
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                placeholder={`Question ${qIndex + 1}`}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      placeholder={`Option ${oIndex + 1}`}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        name="isCorrect"
                        checked={option.isCorrect}
                        onChange={() => {
                          const newQuestions = questions.slice();
                          newQuestions[qIndex].options[oIndex].isCorrect = !newQuestions[qIndex].options[oIndex].isCorrect;
                          setQuestions(newQuestions);
                        }}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm">Correct</span>
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddOption(qIndex)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Option
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Add Question
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Create Quiz
            </button>
          </div>
        </form>
        
      </div>
      
    </div>
    
  );
};

export default CreateQuiz;
