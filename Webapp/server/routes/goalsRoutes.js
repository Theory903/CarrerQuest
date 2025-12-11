import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../db/goals.json');

const router = express.Router();

// GET /api/goals
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading goals data:', error);
    res.status(500).json({ error: 'Failed to load goals data' });
  }
});

// POST /api/goals
router.post('/', (req, res) => {
  try {
    const { name, progress } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Goal name is required' });
    }

    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const newGoal = { name, progress: progress || 0 };
    data.push(newGoal);
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// PUT /api/goals/:index
router.put('/:index', (req, res) => {
  try {
    const { index } = req.params;
    const { progress } = req.body;
    
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    if (index < 0 || index >= data.length) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    data[index].progress = progress;
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    res.json(data[index]);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

export default router;
