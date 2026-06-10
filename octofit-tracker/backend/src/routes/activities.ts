import express from 'express';
import Activity from '../models/Activity';

const router = express.Router();

// GET /api/activities - Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email').sort({ date: -1 });
    res.json({
      message: 'Get all activities',
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// POST /api/activities - Log a new activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    await savedActivity.populate('userId', 'name email');
    res.status(201).json({
      message: 'Activity logged',
      activity: savedActivity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

// GET /api/activities/:id - Get a specific activity
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity ${req.params.id}`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// PUT /api/activities/:id - Update a specific activity
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${req.params.id} updated`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete a specific activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${req.params.id} deleted`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
