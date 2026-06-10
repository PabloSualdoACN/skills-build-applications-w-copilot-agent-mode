import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { getApiBaseUrl, getFrontendUrl } from './config';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Import models to ensure they are registered with Mongoose
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const apiBaseUrl = getApiBaseUrl();
const frontendUrl = getFrontendUrl();

// CORS configuration with Codespaces support
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    port,
    apiUrl: apiBaseUrl,
    frontendUrl,
    environment: process.env.NODE_ENV ?? 'development',
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker backend API',
    version: '0.0.1',
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
    },
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

async function start() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'octofit_db' });
    console.log('✓ MongoDB connected:', mongoUri);
    console.log('✓ API URL:', apiBaseUrl);
    console.log('✓ Frontend URL:', frontendUrl);

    app.listen(port, () => {
      console.log(`✓ Backend listening on http://localhost:${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

start();
