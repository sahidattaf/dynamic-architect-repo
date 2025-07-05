import express from 'express';
import cors from 'cors';
import { GPTItem, GPTStatus } from './src/types';
import { generateFeed } from './src/api/feed';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database (replace with real database in production)
let gpts: GPTItem[] = [];

// API endpoints
app.get('/api/gpts', (req, res) => {
  const { status, category } = req.query;
  let filteredGpts = [...gpts];

  if (status && status !== 'all') {
    filteredGpts = filteredGpts.filter(gpt => gpt.status === status as GPTStatus);
  }

  if (category && category !== 'all') {
    filteredGpts = filteredGpts.filter(gpt => gpt.category === category);
  }

  res.json(filteredGpts);
});

app.post('/api/gpts', (req, res) => {
  try {
    const newGpt: GPTItem = {
      id: Date.now().toString(),
      ...req.body,
      status: 'pending' as GPTStatus,
      timestamp: new Date().toISOString(),
      submissionHistory: [{
        status: 'pending',
        timestamp: new Date().toISOString()
      }]
    };

    gpts.push(newGpt);
    res.status(201).json(newGpt);
  } catch (error) {
    res.status(400).json({ error: 'Invalid GPT data' });
  }
});

app.put('/api/gpts/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const gptIndex = gpts.findIndex(gpt => gpt.id === id);
  if (gptIndex === -1) {
    return res.status(404).json({ error: 'GPT not found' });
  }

  gpts[gptIndex].status = status as GPTStatus;
  gpts[gptIndex].submissionHistory.push({
    status: status,
    timestamp: new Date().toISOString()
  });

  // Update feed if approved
  if (status === 'approved') {
    await generateFeed(gpts);
  }

  res.json(gpts[gptIndex]);
});

app.post('/api/gpts/bulk', async (req, res) => {
  const { ids, action } = req.body;
  const updatedGpts = gpts.map(gpt => {
    if (ids.includes(gpt.id)) {
      gpt.status = action as GPTStatus;
      gpt.submissionHistory.push({
        status: action,
        timestamp: new Date().toISOString()
      });
    }
    return gpt;
  });

  // Update feed if any were approved
  if (action === 'approved') {
    await generateFeed(updatedGpts);
  }

  res.json(updatedGpts);
});

app.get('/api/analytics', (req, res) => {
  const analytics = {
    total: gpts.length,
    pending: gpts.filter(gpt => gpt.status === 'pending').length,
    approved: gpts.filter(gpt => gpt.status === 'approved').length,
    rejected: gpts.filter(gpt => gpt.status === 'rejected').length,
    byCategory: {
      dev: gpts.filter(gpt => gpt.category === 'dev').length,
      design: gpts.filter(gpt => gpt.category === 'design').length,
      writing: gpts.filter(gpt => gpt.category === 'writing').length,
      research: gpts.filter(gpt => gpt.category === 'research').length
    }
  };

  res.json(analytics);
});

app.post('/api/feed/export', async (req, res) => {
  try {
    await generateFeed(gpts);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to export feed' });
  }
});

// Serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
