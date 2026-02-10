const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS: allow your local dev + production frontend domain(s)
app.use(cors({
  origin: [
    'http://localhost:5173',                  // local Vite
    'https://your-app-name.onrender.com'      // ← replace with your actual Render URL after deploy
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Your API routes
app.get('/', (req, res) => {
  res.send('Hello World from backend');
});

app.use('/ai', aiRoutes);

// Serve built Vite/React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from Frontend/dist
  app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

  // Catch-all route for React SPA (handles client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/dist', 'index.html'));
  });
}

module.exports = app;