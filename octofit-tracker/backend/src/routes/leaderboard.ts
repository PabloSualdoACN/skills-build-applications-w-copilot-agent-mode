import express from 'express';
import Leaderboard from '../models/Leaderboard';

const router = express.Router();

// GET /api/leaderboard - Get leaderboard rankings
router.get('/', async (req, res) => {
  try {
    const rankings = await Leaderboard.find().populate('userId', 'name email').populate('teamId', 'name').sort({ rank: 1 });
    res.json({
      message: 'Get leaderboard rankings',
      count: rankings.length,
      rankings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (req, res) => {
  try {
    const teamRankings = await Leaderboard.find({ type: 'team' })
      .populate('teamId', 'name')
      .sort({ rank: 1 });
    res.json({
      message: 'Get team leaderboard',
      count: teamRankings.length,
      teamRankings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/users/:userId - Get specific user ranking
router.get('/users/:userId', async (req, res) => {
  try {
    const ranking = await Leaderboard.findOne({ userId: req.params.userId, type: 'user' }).populate('userId', 'name email');
    if (!ranking) {
      return res.status(404).json({ error: 'User ranking not found' });
    }
    res.json({
      message: `Get ranking for user ${req.params.userId}`,
      ranking,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ranking' });
  }
});

// GET /api/leaderboard/teams/:teamId - Get specific team ranking
router.get('/teams/:teamId', async (req, res) => {
  try {
    const ranking = await Leaderboard.findOne({ teamId: req.params.teamId, type: 'team' }).populate('teamId', 'name');
    if (!ranking) {
      return res.status(404).json({ error: 'Team ranking not found' });
    }
    res.json({
      message: `Get ranking for team ${req.params.teamId}`,
      ranking,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team ranking' });
  }
});

export default router;
