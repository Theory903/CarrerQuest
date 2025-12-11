import express from 'express';
import { generateReport, getReport, getQuickInsights, compareCarers } from '../controllers/reportController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/reports/generate - Generate comprehensive report
router.post('/generate', optionalAuth, generateReport);

// GET /api/reports/:reportId - Get report by ID
router.get('/:reportId', getReport);

// POST /api/reports/insights - Get quick insights
router.post('/insights', getQuickInsights);

// POST /api/reports/compare - Compare career paths
router.post('/compare', compareCarers);

export default router;

