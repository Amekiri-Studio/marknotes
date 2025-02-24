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
 *        - in: header
 *          name: x-mn-authorization
 *          description: 登录后获取到的Token(部分笔记为私有，需要登录后才可以获取到)
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.get, NoteController.get);

/**
 * @swagger
 * /v1/note/update/{id}:
 *  put:
 *      summary: 更新笔记
 *      description: 更新笔记(若编辑非本人的笔记，请使用/v1/note/edit/:id接口)
 *      tags:
 *        - Note
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nid:
 *                              type: number
 *                              description: 笔记ID
 *                          title:
 *                              type: string
 *                              description: 笔记标题
 *                          content:
 *                              type: string
 *                              description: 笔记内容
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          description: 登录后获取到的Token
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.update, NoteController.update);

/**
 * @swagger
 * /v1/note/edit/{id}:
 *  put:
 *      summary: 编辑笔记(编辑公开/他人笔记)
 *      description: 编辑笔记(编辑公开/他人笔记)
 *      tags:
 *        - Note
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nid:
 *                              type: number
 *                              description: 笔记ID
 *                          title:
 *                              type: string
 *                              description: 笔记标题
 *                          content:
 *                              type: string
 *                              description: 笔记内容
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          description: 登录后获取到的Token
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.edit, NoteController.edit);

/**
 * @swagger
 * /v1/note/remove/{id}:
 *  delete:
 *      summary: 删除笔记
 *      description: 删除笔记
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 笔记ID
 *        - in: header
 *          name: x-mn-authorization
 *          description: 登录后获取到的Token
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.delete(Paths.remove, NoteController.remove);

/**
 * @swagger
 * /v1/note/search/{keyword}:
 *  get:
 *      summary: 通过关键字搜索笔记
 *      description: 通过关键字搜索笔记
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: keyword
 *          description: 笔记ID
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.search, NoteController.search);

/**
 * @swagger
 * /v1/note/list:
 *  get:
 *      summary: 列出自己创建的所有笔记
 *      description: 列出自己创建的所有笔记
 *      tags:
 *        - Note
 *      parameters:
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.list, NoteController.list);

/**
 * @swagger
 * /v1/note/list/{id}:
 *  get:
 *      summary: 列出他人的所有笔记
 *      description: 列出他人的所有笔记(通过用户ID)
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 用户ID
 *          schema:
 *              type: number
 *      responses:
 *          '200':
 *              description: OK
 */
router.get(Paths.listById, NoteController.listById);

/**
 * @swagger
 * /v1/note/image:
 *  post:
 *      summary: 上传图片
 *      description: 上传图片(笔记)
 *      tags:
 *        - Note
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - name: image
 *          in: formData
 *          description: 要上传的图片，接受Blob
 *          required: true
 *          type: file
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.post(Paths.image, NoteController.uploadImage);

/**
 * @swagger
 * /v1/note/public/{id}:
 *  put:
 *      summary: 设置笔记为公开可见
 *      description: 设置笔记为公开可见
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 笔记ID
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.setPublic, NoteController.setNotePublic);

/**
 * @swagger
 * /v1/note/private/{id}:
 *  put:
 *      summary: 设置笔记为不公开可见
 *      description: 设置笔记为不公开可见
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 笔记ID
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.setPrivate, NoteController.setNotePrivate);

/**
 * @swagger
 * /v1/note/public/edit/{id}:
 *  put:
 *      summary: 设置笔记为公开可编辑(需先设置为公开可见)
 *      description: 设置笔记为公开可编辑(需先设置为公开可见)
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 笔记ID
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.setPublicEdit, NoteController.setNotePublicEdit);

/**
 * @swagger
 * /v1/note/private/edit/{id}:
 *  put:
 *      summary: 设置笔记为不公开可编辑
 *      description: 设置笔记为不公开可编辑
 *      tags:
 *        - Note
 *      parameters:
 *        - in: path
 *          name: id
 *          description: 笔记ID
 *        - in: header
 *          name: x-mn-authorization
 *          required: true
 *          description: 登录后获取到的Token
 *      responses:
 *          '200':
 *              description: OK
 */
router.put(Paths.setPrivateEdit, NoteController.setNotePrivateEdit);

export default router;