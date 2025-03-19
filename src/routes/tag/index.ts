import { Router } from 'express';
import Paths from './Paths';
import TagController from '@src/controllers/TagController';

const router = Router();

/**
 * @swagger
 * /v1/tag/add:
 *  post:
 *      summary: 添加标签
 *      description: 添加标签（支持批量操作）
 *      tags:
 *        - Tag
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: 登录后获取到的Token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                        - tags
 *                      properties:
 *                          tags:
 *                              type: array
 *                              minItems: 1
 *                              items:
 *                                  type: object
 *                                  required:
 *                                    - tagName
 *                                    - associatedNote
 *                                  properties:
 *                                      tagName:
 *                                          type: string
 *                                          minLength: 2
 *                                          maxLength: 20
 *                                          example: "前端开发"
 *                                      associatedNote:
 *                                          type: integer
 *                                          format: int64
 *                                          minimum: 1
 *                                          example: 123
 *                              example:
 *                                - tagName: "JavaScript"
 *                                  associatedNote: 456
 *                                - tagName: "TypeScript"
 *                                  associatedNote: 789
 *      responses:
 *          '200':
 *              description: 操作成功
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      code:
 *                        type: integer
 *                        example: 0
 */
router.post(Paths.add, TagController.add);

/**
 * @swagger
 * /v1/tag/remove:
 *  delete:
 *      summary: 批量删除标签
 *      description: 根据标签名称和关联笔记ID批量删除标签
 *      tags:
 *        - Tag
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: 登录后获取到的Token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                        - tags
 *                      properties:
 *                          tags:
 *                              type: array
 *                              minItems: 1
 *                              items:
 *                                  type: number
 *      responses:
 *          '200':
 *              description: 删除成功
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      code:
 *                        type: integer
 *                        example: 0
 *                      deletedCount:
 *                        type: integer
 *                        example: 2
 */
router.delete(Paths.remove, TagController.remove);

/**
 * @swagger
 * /v1/tag/list/{tag}:
 *  get:
 *      summary: 通过标签查找对应的笔记
 *      description: 通过标签查找对应的笔记
 *      tags:
 *        - Tag
 *      parameters:
 *        - in: path
 *          name: tag
 *          required: true
 *          description: 标签名
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.list, TagController.listTagWithNote);

/**
 * @swagger
 * /v1/tag/list/note/{id}:
 *  get:
 *      summary: 查找笔记对应的标签
 *      description: 查找笔记对应的标签
 *      tags:
 *        - Tag
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
router.get(Paths.listByNote, TagController.listTagsByNote);

export default router;