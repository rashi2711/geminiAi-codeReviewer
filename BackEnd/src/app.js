const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS: allow your local dev + production frontend domain(s)
app.use(cors({
  origin: [
    'http://localhost:5173',                   // local Vite dev
    'https://geminiai-codereviewer-7.onrender.com' // deployed frontend
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Your API routes
app.use('/ai', aiRoutes);

// Serve built Vite/React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from Frontend/dist
  app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

  // Catch-all route for React SPA (handles client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/dist', 'index.html'));
  });
} else {
  // Only show this in development
  app.get('/', (req, res) => {
    res.send('Hello World from backend');
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
