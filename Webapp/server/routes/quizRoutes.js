import express from 'express';
import { getQuizQuestions, submitQuiz, getQuizResult } from '../controllers/quizController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/quiz/questions - Get quiz questions
router.get('/questions', getQuizQuestions);

// POST /api/quiz/submit - Submit quiz answers
router.post('/submit', optionalAuth, submitQuiz);

// GET /api/quiz/result/:resultId - Get quiz result
router.get('/result/:resultId', getQuizResult);

export default router;

