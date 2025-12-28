import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRouter from './routers/users-router.js';
import cookieParser from 'cookie-parser';
import scanRouter from './routers/scans-router.js';
import authRouter from './routers/auth-router.js';
import adminRouter from './routers/admin-router.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Allow Vercel domains
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://webshield.vercel.app',  
      /\.vercel\.app$/ 
    ],
    credentials:  true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'], 
  })
);

app.use(cookieParser());

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit:  '1mb' }));

//  Connect to database
connectDB();

// Routes
app.use('/user', userRouter);
app.use('/scan', scanRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'WebShield Backend server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    error:  'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message :  undefined
  });
});

// FOR LOCAL DEVELOPMENT ONLY
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Frontend URL: http://localhost:5173`);
    console.log(`Database: ${process.env.DB_URL ? 'Connected' : 'Not configured'}`);
  });
}

// FOR VERCEL 
export default app;