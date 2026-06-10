import express from 'express';
import Team from '../models/Team';

const router = express.Router();

// GET /api/teams - Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members', '-password');
    res.json({
      message: 'Get all teams',
      count: teams.length,
      teams,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// POST /api/teams - Create a new team
router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    await savedTeam.populate('members', '-password');
    res.status(201).json({
      message: 'Team created',
      team: savedTeam,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// GET /api/teams/:id - Get a specific team
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', '-password');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Get team ${req.params.id}`,
      team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// PUT /api/teams/:id - Update a specific team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      'members',
      '-password'
    );
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${req.params.id} updated`,
      team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id - Delete a specific team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${req.params.id} deleted`,
      team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
