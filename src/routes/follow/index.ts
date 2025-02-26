import { Router } from 'express';
import Paths from './Paths';

import app from '@src/server';

import FollowController from '@src/controllers/FollowController';

const router = Router();

/**
 * @swagger
 * /v1/follow/{id}:
 *  post:
 *      summary: 关注某人
 *      description: 关注某人
 *      tags:
 *        - Follow
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 需要关注的人
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.post(Paths.follow, FollowController.follow);

/**
 * @swagger
 * /v1/follow/cancel/{id}:
 *  post:
 *      summary: 取消关注某人
 *      description: 取消关注某人
 *      tags:
 *        - Follow
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 需要取消关注的人
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.post(Paths.cancelFollow, FollowController.cancelFollow);

/**
 * @swagger
 * /v1/follow/list/{id}:
 *  post:
 *      summary: 列出某人的关注
 *      description: 列出某人的关注
 *      tags:
 *        - Follow
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 用户ID
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.listFollowed, FollowController.listFollowed);

/**
 * @swagger
 * /v1/follow/list/following/{id}:
 *  post:
 *      summary: 列出某人的粉丝
 *      description: 列出某人的粉丝
 *      tags:
 *        - Follow
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 用户ID
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.listFollowing, FollowController.listFollowing);

export default router;