import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Connect to MongoDB database (octofit_db)
 */
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'octofit_db',
    });
    console.log('✓ Connected to octofit_db');
  } catch (error) {
    console.error('✗ Failed to connect to database:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB database
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from database');
  } catch (error) {
    console.error('✗ Failed to disconnect from database:', error);
    throw error;
  }
}

export default mongoose;
