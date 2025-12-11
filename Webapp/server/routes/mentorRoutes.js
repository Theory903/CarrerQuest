import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// GET /api/mentors
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, '../db/mentors.json'), 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading mentors data:', error);
    res.status(500).json({ error: 'Failed to load mentors data' });
  }
});

// GET /api/mentors/:id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(readFileSync(join(__dirname, '../db/mentors.json'), 'utf-8'));
    const mentor = data.find(m => m.id === parseInt(id));
    
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    
    res.json(mentor);
  } catch (error) {
    console.error('Error reading mentor data:', error);
    res.status(500).json({ error: 'Failed to load mentor data' });
  }
});

export default router;
