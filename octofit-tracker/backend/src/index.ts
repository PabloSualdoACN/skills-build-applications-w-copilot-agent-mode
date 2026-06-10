import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', port, mongoUri });
});

app.get('/', (req, res) => {
  res.send('OctoFit Tracker backend is running.');
});

async function start() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'octofit-tracker' });
    console.log('MongoDB connected:', mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

start();
