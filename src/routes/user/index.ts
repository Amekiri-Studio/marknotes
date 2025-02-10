import { Router } from 'express';
import Paths from './Paths';
import UserController from '@src/controllers/UserController';

const router = Router();

/**
 * @swagger
 * /v1/user/add:
 *  post:
 *      summary: 添加用户
 *      description: 添加一个新用户
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: 用户名，不可以重复
 *                          nickname:
 *                              type: string
 *                              description: 昵称
 *                          password:
 *                              type: string
 *                              description: 密码，不需要HASH，服务器会自行HASH
 *      responses:
 *          '200':
 *              description: 成功添加用户
 *          '400':
 *              description: 参数错误
 *          '500':
 *              description: 服务器错误
 */
router.post(Paths.add, UserController.add);

/**
 * @swagger
 * /v1/user/get:
 *  get:
 *      summary: 通过用户ID获取用户对象
 *      description: 通过用户ID获取用户对象
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
router.get(Paths.get, UserController.get);

/**
 * @swagger
 * /v1/user/update:
 *  put:
 *      summary: 更新用户个人信息
 *      description: 可更新用户名，昵称，密码，头像
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userInfoType:
 *                              type: string
 *                              description: 用户信息类别，只能在'username'，'nickname'，'password'，'avatar'中选择
 *                          value:
 *                              type: string
 *                              description: 值。如果userInfoType是'username'，value是'user1'，用户名会被修改为'user1'
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.update, UserController.update);

/**
 * @swagger
 * /v1/user/remove:
 *  delete:
 *      summary: 删除用户(注销用户)
 *      description: 删除当前用户(需要已登录)
 *      responses:
 *          '200':
 *              description: OK
 */
router.delete(Paths.remove, UserController.remove);

/**
 * @swagger
 * /v1/user/login:
 *  post:
 *      summary: 登录
 *      description: 用户登录，登录成功后返回一个token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: 用户名
 *                          password:
 *                              type: string
 *                              description: 密码(前端无需HASH，服务器会自行HASH)
 *      responses:
 *          '200':
 *              description: OK
 *          '500':
 *              description: 服务器错误
 */
router.post(Paths.login, UserController.login);

export default router;