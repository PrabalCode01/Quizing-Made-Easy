import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import QuizResult from './components/QuizResult';
import Home from './components/Home';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/create" element={<CreateQuiz/>} />
        <Route path="/quiz" element={<TakeQuiz/>} />
        <Route path="/take-quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<QuizResult/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
