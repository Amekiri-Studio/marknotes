import { Router } from 'express';

import userRouter from './user'
import userRouterPaths from './user/Paths';

import noteRouter from './note'
import noteRouterPaths from './note/Paths'

const route = Router();
route.use(userRouterPaths.base, userRouter);
route.use(noteRouterPaths.base, noteRouter);

export default route;
