import React,{useEffect} from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/Quiz/CreateQuiz';
import TakeQuiz from './components/Quiz/TakeQuiz';
import QuizResult from './components/Quiz/QuizResult';
import Home from './components/Home/Home';
import QuizPage from './components/Quiz/QuizPage';
import Auth from './components/Auth/Auth'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/create" element={<CreateQuiz/>} />
        <Route path="/quiz" element={<TakeQuiz/>} />
        <Route path="/take-quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<QuizResult/>} />
        <Route path="/login" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
