const express = require('express')
const router = express.Router();
const { loginController, registerController,getUserController } = require('../controllers/auth.controllers')
const verifyToken = require('../middleware/auth.middleware')


 /**
  * @swagger
  * tags:
  *   name: Authentication
  *   description: Authen login and register
  */


/**
 * @swagger
 * components:
 *   schemas:
 *     Authentication:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: enter username
 *         password:
 *           type: string
 *           description: enter password      
 *       example:
 *         username: hoangvinh@12
 *         password: hoangvinh
 */



/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Authentication]
 *     security: 
 *          bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Authentication'
 */

router.get('/',verifyToken, getUserController)


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Người dùng đăng nhập
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentication'
 *       500:
 *         description: Some server error
 */


router.post('/login', loginController)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng kí người dùng
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentication'
 *       500:
 *         description: Some server error
 */


router.post('/register', registerController)

module.exports = router