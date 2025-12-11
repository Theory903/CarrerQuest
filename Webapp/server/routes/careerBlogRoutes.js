import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// GET /api/careerBlogs
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, '../db/careerBlogs.json'), 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading career blogs:', error);
    res.status(500).json({ error: 'Failed to load career blogs' });
  }
});

// GET /api/careerBlogs/:id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(readFileSync(join(__dirname, '../db/careerBlogs.json'), 'utf-8'));
    const blog = data.find(b => b.id === parseInt(id));
    
    if (!blog) {
      return res.status(404).json({ error: 'Career blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error reading career blog:', error);
    res.status(500).json({ error: 'Failed to load career blog' });
  }
});

export default router;
