import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  type: 'running' | 'cycling' | 'swimming' | 'strength' | 'yoga' | 'cardio' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: string[];
  caloriesBurned: number;
  targetMuscles?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'strength', 'yoga', 'cardio', 'other'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: {
      type: Number,
      required: true,
    },
    exercises: {
      type: [String],
      default: [],
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    targetMuscles: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
