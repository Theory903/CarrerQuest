import express from 'express';
import { getAIResponse, analyzeCareer, clearConversation } from '../controllers/aiChatController.js';

const router = express.Router();

// POST /api/chat - Main chat endpoint
router.post('/', getAIResponse);

// POST /api/chat/analyze - Career analysis
router.post('/analyze', analyzeCareer);

// POST /api/chat/clear - Clear conversation
router.post('/clear', clearConversation);

export default router;
