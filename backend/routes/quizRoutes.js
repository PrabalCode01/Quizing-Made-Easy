const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuizById } = require('../controllers/quizController');

router.route('/').post(createQuiz);
router.route('/').get(getQuizzes)

router.route('/:id')
    .get(getQuizById);

module.exports = router;
