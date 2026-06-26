import { Router } from 'express';

import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ points: -1, user: 1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

export default router;