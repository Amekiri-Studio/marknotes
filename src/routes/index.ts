import { Router } from 'express';

import userRouter from './user'
import userRouterPaths from './user/Paths';

const route = Router();
route.use(userRouterPaths.base, userRouter);

export default route;
