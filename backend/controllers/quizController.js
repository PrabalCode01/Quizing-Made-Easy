const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    const { title, questions } = req.body;

    const quiz = new Quiz({
        title,
        questions,
    });

    await quiz.save();
    res.status(201).json(quiz);
};

const getQuizzes = async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
};

const getQuizById = async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
};

module.exports = {
    createQuiz,
    getQuizzes,
    getQuizById,
};
