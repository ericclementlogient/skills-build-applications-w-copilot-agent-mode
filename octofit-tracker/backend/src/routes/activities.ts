import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 });
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

export default router;