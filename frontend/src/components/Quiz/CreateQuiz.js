import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ text: '', isCorrect: false }] }]);
  const [errors, setErrors] = useState({ title: '', questions: [] });

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);

    const newErrors = { ...errors };
    newErrors.questions[index] = '';
    setErrors(newErrors);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    const newErrors = { ...errors };

    if (newQuestions[qIndex].questionText.trim() === '') {
      newErrors.questions[qIndex] = 'Please enter the question before adding options.';
    } else {
      newQuestions[qIndex].options[oIndex][event.target.name] = event.target.value;
      newErrors.questions[qIndex] = '';
    }

    setQuestions(newQuestions);
    setErrors(newErrors);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    const selectedOption = newQuestions[qIndex].options[oIndex];
    const newErrors = { ...errors };

    if (newQuestions[qIndex].questionText.trim() === '') {
      newErrors.questions[qIndex] = 'Please enter the question before marking options.';
    } else if (selectedOption.text.trim() === '') {
      newErrors.questions[qIndex] = "Option text can't be empty.";
    } else {
      newQuestions[qIndex].options.forEach((option, index) => {
        if (index !== oIndex) {
          option.isCorrect = false;
        }
      });

      newQuestions[qIndex].options[oIndex].isCorrect = !newQuestions[qIndex].options[oIndex].isCorrect;

      newErrors.questions[qIndex] = '';
    }

    setQuestions(newQuestions);
    setErrors(newErrors);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    const newErrors = { ...errors };

    newQuestions.splice(index, 1);
    newErrors.questions.splice(index, 1);

    setQuestions(newQuestions);
    setErrors(newErrors);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    const newErrors = { ...errors };

    if (newQuestions[index].questionText.trim() === '') {
      newErrors.questions[index] = 'Please enter the question before adding options.';
    } else {
      newQuestions[index].options.push({ text: '', isCorrect: false });
      newErrors.questions[index] = '';
    }

    setQuestions(newQuestions);
    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = { title: '', questions: [] };
    let hasErrors = false;

    if (title.trim() === '') {
      newErrors.title = "Quiz title can't be empty.";
      hasErrors = true;
    }

    questions.forEach((question, i) => {
      if (question.questionText.trim() === '') {
        newErrors.questions[i] = `Question ${i + 1} can't be empty.`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

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
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
              }}
              placeholder="Quiz Title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
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
              {errors.questions[qIndex] && (
                <p className="text-red-600 text-sm mt-1">{errors.questions[qIndex]}</p>
              )}
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
                        onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm">Correct</span>
                    </label>
                  </div>
                ))}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleAddOption(qIndex)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Option
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOption(qIndex, questions[qIndex].options.length - 1)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    - Remove Option
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Add Question
            </button>
            <button
              type="button"
              onClick={() => handleDeleteQuestion(questions.length - 1)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              disabled={questions.length === 1} // Disable if only one question left
            >
              Delete Last Question
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
