import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
     
      <main className="flex-grow container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to QuizArena!</h1>
        <p className="text-lg mb-6">
          Enhance your knowledge with our engaging quizzes. Create your own quizzes to challenge others,
          or take existing quizzes to test your skills. Quizzes are a great way to learn and retain
          information. Join us today and start your quiz journey!
        </p>
      </main>

      {/* Footer */}
     <Footer/>

     
    </div>
  );
};

export default Home;
