import { Router } from 'express';
import Paths from './Paths';

import app from '@src/server';
import CommentController from '@src/controllers/CommentController';

const router = Router();

/**
 * @swagger
 * /v1/comment/add:
 *  post:
 *      summary: 添加一条评论
 *      description: 添加一条评论
 *      tags: 
 *        - Comment
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          note:
 *                              type: number
 *                              description: 笔记ID(在哪个笔记下添加评论，需要笔记设置为公开可见)
 *                          content:
 *                              type: string
 *                              description: 评论内容
 *                          upperComment:
 *                              type: number
 *                              description: 上级评论
 *      responses:
 *          '200':
 *              description: OK
 */
router.post(Paths.add, CommentController.add);

/**
 * @swagger
 * /v1/comment/update:
 *  put:
 *      summary: 更新评论
 *      description: 更新评论
 *      tags: 
 *        - Comment
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          cid:
 *                              type: number
 *                              description: 评论ID
 *                          content:
 *                              type: string
 *                              description: 评论内容
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.update, CommentController.update);

/**
 * @swagger
 * /v1/comment/remove/{id}:
 *  delete:
 *      summary: 删除评论
 *      description: 删除评论
 *      tags:
 *        - Comment
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: 评论ID
 *          schema:
 *              type: number
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.delete(Paths.remove, CommentController.remove);

/**
 * @swagger
 * /v1/comment/list/{id}:
 *  get:
 *      summary: 获取某笔记下的评论
 *      description: 获取某笔记下的评论
 *      tags:
 *        - Comment
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: 笔记ID
 *          schema:
 *              type: number
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.list, CommentController.list);

/**
 * @swagger
 * /v1/comment/list/user/{id}:
 *  get:
 *      summary: 获取某用户已经发表的评论
 *      description: 获取某用户已经发表的评论
 *      tags:
 *        - Comment
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: 用户ID
 *          schema:
 *              type: number
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.listByUser, CommentController.listByUser);
export default router;