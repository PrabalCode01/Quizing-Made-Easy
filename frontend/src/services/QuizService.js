import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizerarena-aspirenex-1.onrender.com/api/quizzes',
});

export const createQuiz = (quiz) => api.post('/', quiz);
export const getQuizzes = () => api.get('/');
export const getQuizById = (id) => api.get(`/${id}`);
