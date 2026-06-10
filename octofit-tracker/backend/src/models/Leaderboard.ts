import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  points: number;
  activitiesCount: number;
  rank: number;
  type: 'user' | 'team';
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['user', 'team'],
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
