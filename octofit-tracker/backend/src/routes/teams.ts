import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

export default router;