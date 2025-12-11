import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// GET /api/interests
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, '../db/intrestdata.json'), 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading interests data:', error);
    res.status(500).json({ error: 'Failed to load interests data' });
  }
});

export default router;
