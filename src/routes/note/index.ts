import { Router } from 'express';
import Paths from './Paths';
import app from '@src/server';
import NoteController from '@src/controllers/NoteController';

const router = Router();

/**
 * @swagger
 * /v1/note/add:
 *  post:
 *      summary: 添加笔记
 *      description: 添加笔记(需要Token)
 *      tags:
 *        - Note
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
 *                          title:
 *                              type: string
 *                              description: 笔记标题(必须)
 *                          language:
 *                              type: string
 *                              description: 笔记语言(若不提供，将读取浏览器首选语言)
 *                          content:
 *                              type: string
 *                              description: 笔记内容(必须)
 *                          isShare:
 *                              type: boolean
 *                              description: 笔记是否公开(若不提供，默认为false)
 *                          allowPublicEdit:
 *                              type: boolean
 *                              description: 笔记是否允许公开编辑(若不提供，默认为false)
 *      responses:
 *          '200':
 *              description: OK
 */
router.post(Paths.add, NoteController.add);

/**
 * @swagger
 * /v1/note/get/{id}:
 *  get:
 *      summary: 通过ID获取笔记
 *      description: 通过笔记ID获取笔记
 *      tags:
 *        - Note
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
router.get(Paths.get, NoteController.get);

router.put(Paths.update, NoteController.update);

router.delete(Paths.remove, NoteController.remove);

router.get(Paths.search, NoteController.search);

export default router;