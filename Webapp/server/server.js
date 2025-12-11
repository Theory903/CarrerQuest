import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Route imports
import interestRoutes from './routes/interestRoutes.js';
import strengthsWeaknessesRoutes from './routes/strengthsWeaknessesRoutes.js';
import careerTreeRoutes from './routes/careerTreeRoutes.js';
import goalsRoutes from './routes/goalsRoutes.js';
import academicPerformanceRoutes from './routes/academicPerformanceRoutes.js';
import participationRoutes from './routes/participationRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import mentorshipRequestRoutes from './routes/mentorshipRequestRoutes.js';
import aiChatRoutes from './routes/aiChatRoutes.js';
import careerBlogRoutes from './routes/careerBlogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 1000, // Stricter in production
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// AI endpoint has stricter rate limiting
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: NODE_ENV === 'production' ? 10 : 100,
  message: { error: 'AI rate limit exceeded. Please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const allowedOrigins = NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL || 'https://careerquest.vercel.app',
      'https://careerquest.com',
      'https://www.careerquest.com',
    ]
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://localhost:5173',
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (production)
if (NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: NODE_ENV,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/subjects', strengthsWeaknessesRoutes);
app.use('/api/careerTree', careerTreeRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/academicPerformance', academicPerformanceRoutes);
app.use('/api/participation', participationRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentorshipRequests', mentorshipRequestRoutes);
app.use('/api/chat', aiLimiter, aiChatRoutes);
app.use('/api/careerBlogs', careerBlogRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/reports', reportRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  // Log error
  console.error('Error:', {
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  res.status(status).json({
    error: message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Graceful Shutdown
const server = app.listen(PORT, () => {
  console.log(`
🚀 CareerQuest Server v2.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Server: http://localhost:${PORT}
🔧 Health: http://localhost:${PORT}/api/health
🤖 AI Chat: http://localhost:${PORT}/api/chat
📊 Quiz: http://localhost:${PORT}/api/quiz
📝 Reports: http://localhost:${PORT}/api/reports
🌍 Environment: ${NODE_ENV}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, you might want to exit here
  if (NODE_ENV === 'production') {
    process.exit(1);
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // In production, exit the process
  if (NODE_ENV === 'production') {
    process.exit(1);
  }
});

export default app;
