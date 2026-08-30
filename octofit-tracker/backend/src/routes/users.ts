import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ username: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;