// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('rate-limiter-flexible');
const dotenv = require('dotenv');

// Load environment variables
require('dotenv').config({ path: __dirname + '/.env' });

console.log("Variables de entorno cargadas:");
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Configurada" : "No configurada");
console.log("GOOGLE_TTS_API_KEY:", process.env.GOOGLE_TTS_API_KEY ? "Configurada" : "No configurada");

// Create Express app


console.log("OpenAI API Key configurada:", !!process.env.OPENAI_API_KEY);
console.log("Google TTS API Key configurada:", !!process.env.GOOGLE_TTS_API_KEY);

// Security middleware
app.use(helmet());

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Origin ${origin} not allowed by CORS`);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Rate limiting
const apiLimiter = new rateLimit.RateLimiterMemory({
  points: 10, // Number of requests
  duration: 60, // Per minute
});

app.use(async (req, res, next) => {
  try {
    await apiLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
});

// Agregar esto antes de tus rutas para manejar solicitudes OPTIONS
app.options('*', cors());

// Import route handlers
const storyRoutes = require('./routes/storyRoutes');
const audioRoutes = require('./routes/audioRoutes');

// Apply routes
app.use('/api/stories', storyRoutes);
app.use('/api/audio', audioRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'An internal server error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});