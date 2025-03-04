import { Router } from 'express';

import userRouter from './user'
import userRouterPaths from './user/Paths';

import noteRouter from './note'
import noteRouterPaths from './note/Paths'

import followRouter from './follow'
import followRouterPaths from './follow/Paths'

import commentRouter from './comment';
import commentRouterPaths from './comment/Paths'

import tagRouter from './tag';
import tagRouterPaths from "./tag/Paths";

const route = Router();
route.use(userRouterPaths.base, userRouter);
route.use(noteRouterPaths.base, noteRouter);
route.use(followRouterPaths.base, followRouter);
route.use(commentRouterPaths.base, commentRouter);
route.use(tagRouterPaths.base, tagRouter);

export default route;
