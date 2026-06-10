import express from 'express';
import Workout from '../models/Workout';

const router = express.Router();

// GET /api/workouts - Get all workout suggestions
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get workout suggestions',
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// POST /api/workouts - Create a new workout suggestion
router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.status(201).json({
      message: 'Workout suggestion created',
      workout: savedWorkout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts/:id - Get a specific workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${req.params.id}`,
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id - Update a specific workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${req.params.id} updated`,
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete a specific workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${req.params.id} deleted`,
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
