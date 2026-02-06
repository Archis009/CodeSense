import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security & Utility Middleware
app.use(helmet()); // Secure HTTP headers
app.use(morgan('dev')); // HTTP request logger

// CORS Configuration
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Body Parsing Middleware (Must be before routes)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'CodeSense API is running' });
});

// Routes
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
// Fallback for requests missing /api prefix (Helper for misconfigured clients)
app.use('/auth', authRoutes);
app.use('/analysis', analysisRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  // If status is 200 (default), change to 500. Otherwise keep existing error status (e.g. 400, 401, 404)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Only start server if not running in Vercel (serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`));
}

export default app;
