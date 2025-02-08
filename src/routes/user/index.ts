import { Router } from 'express';
import Paths from './Paths';
import UserController from '@src/controllers/UserController';

const router = Router();

router.post(Paths.add, UserController.add);
router.get(Paths.add, UserController.get);

export default router;