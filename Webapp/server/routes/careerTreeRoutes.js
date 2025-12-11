import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// GET /api/careerTree
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, '../db/careerTree.json'), 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading career tree data:', error);
    res.status(500).json({ error: 'Failed to load career tree data' });
  }
});

export default router;
