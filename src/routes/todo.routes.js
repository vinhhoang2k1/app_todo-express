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

router.get('/', verifyToken, getAllTodos)
router.get('/:id', verifyToken, getOneTodo)
router.post('/create', verifyToken, createTodo)
router.put('/:id', verifyToken, editTodo)
router.delete('/:id', verifyToken, deleteTodo)

module.exports = router