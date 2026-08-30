import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ name: 1 });
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default router;