const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

// server.js (backend)
app.use(cors({
  origin: 'http://localhost:5173',  // ← exact Vite port
  methods: ['GET', 'POST'],
  credentials: true,
}))


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app