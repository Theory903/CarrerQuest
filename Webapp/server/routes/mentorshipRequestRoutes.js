import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../db/mentorshipRequests.json');

const router = express.Router();

// GET /api/mentorshipRequests
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading mentorship requests:', error);
    res.status(500).json({ error: 'Failed to load mentorship requests' });
  }
});

// POST /api/mentorshipRequests
router.post('/', (req, res) => {
  try {
    const { name, email, preferredMentor, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    let data = [];
    try {
      data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    } catch {
      data = [];
    }

    const newRequest = {
      id: uuidv4(),
      name,
      email,
      preferredMentor: preferredMentor || null,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    data.push(newRequest);
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    res.status(201).json({
      success: true,
      message: 'Mentorship request submitted successfully',
      request: newRequest
    });
  } catch (error) {
    console.error('Error creating mentorship request:', error);
    res.status(500).json({ error: 'Failed to submit mentorship request' });
  }
});

export default router;
