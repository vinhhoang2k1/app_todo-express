const express = require('express')
const router = express.Router();
const { loginController, registerController,getUserController } = require('../controllers/auth.controllers')
const verifyToken = require('../middleware/auth.middleware')


router.get('/',verifyToken, getUserController)
router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router