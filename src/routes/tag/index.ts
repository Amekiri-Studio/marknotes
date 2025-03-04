import { Router } from 'express';
import Paths from './Paths';
import TagController from '@src/controllers/TagController';

const router = Router();

router.post(Paths.add, TagController.add);

router.delete(Paths.remove, TagController.remove);

router.get(Paths.list, TagController.listTagWithNote);

router.get(Paths.listByNote, TagController.listTagsByNote);

export default router;