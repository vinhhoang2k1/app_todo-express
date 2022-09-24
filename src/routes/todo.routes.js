const express = require('express')
const router = express.Router()
const verifyToken = require("../middleware/auth.middleware")
const {
    getAllTodos,
    getOneTodo,
    createTodo,
    editTodo,
    deleteTodo
} = require('../controllers/todo.controllers')

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Thêm sửa xoá công việc
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Tên của công việc
 *         description:
 *           type: string
 *           description: Mô tả công việc
 *         status:
 *           type: string
 *           description: Trạng thái công việc [TO LEARN, LEARNING, LEARNED]           
 *       example:
 *         title: Quét nhà
 *         description: Làm việc nhà lúc 7h
 *         status: TO LEARN
 */


/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Lấy danh sách việc làm
 *     tags: [Todo]
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */


router.get('/', verifyToken, getAllTodos)

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 công việc từ id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Todo'
 */

router.get('/:id', verifyToken, getOneTodo)

/**
 * @swagger
 * /api/todo/create:
 *   post:
 *     summary: Tạo một công việc
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tạo công việc thành công
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */

router.post('/create', verifyToken, createTodo)

/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Sửa một công việc theo id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sửa công việc thành công
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */

router.put('/:id', verifyToken, editTodo)

/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Xoá 1 công việc theo id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Todo'
 */

router.delete('/:id', verifyToken, deleteTodo)

module.exports = router