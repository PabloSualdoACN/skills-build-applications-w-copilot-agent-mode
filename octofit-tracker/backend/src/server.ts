import cors from 'cors';
import express from 'express';
import { getApiBaseUrl, getFrontendUrl } from './config/environment';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Import models to ensure Mongoose schemas are registered
import './models/User';
import './models/Team';
import './models/Activity';
import './models/Leaderboard';
import './models/Workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const apiBaseUrl = getApiBaseUrl();
const frontendUrl = getFrontendUrl();

// Backend runs on port 8000
// Build API base URL with $CODESPACE_NAME when available:
// https://$CODESPACE_NAME-8000.app.github.dev

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    port,
    apiUrl: apiBaseUrl,
    frontendUrl,
    environment: process.env.NODE_ENV ?? 'development',
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker backend API',
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
    },
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
  });
});

async function start() {
  try {
    await connectDatabase();
    console.log('✓ API URL:', apiBaseUrl);
    console.log('✓ Frontend URL:', frontendUrl);
    app.listen(port, () => {
      console.log(`✓ Backend listening on http://localhost:${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

start();
