const TodoServices = require('../services/todo.services.js')
const Todo = require("../models/todo.models")
const TodoController = {}

// create todo
TodoController.createTodo = async (req, res) => {
    const { title, description, status } = req.body
    if (!title) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Title is required'
            })
    }
    try {
        const newTodo = new Todo({
            title,
            description,
            status: status || 'TO LEARN',
            user: req.userId,
        })
        await newTodo.save()

        return res
            .status(200)
            .json({
                success: true,
                message: 'Tạo todo thành công ',
                todo: newTodo,
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
},
    TodoController.editTodo = async (req, res) => {
        const { title, description, status } = req.body
        if (!title) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Title is required'
                })
        }
        try {
            let updatedTodo = {
                title,
                description,
                status
            }

            const todoUpdateCondition = {
                _id: req.params.id,
                user: req.userId
            }
            updatedTodo = await Todo.findOneAndUpdate(
                todoUpdateCondition,
                updatedTodo,
                // { new: true }
            )
            if (!updatedTodo)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised'
                })
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Cập nhật thành công',
                    todo: updatedTodo
                })

        } catch (error) {

        }
    },
    TodoController.deleteTodo = async (req, res) => {
        const todoDeleteCondition = { _id: req.params.id, user: req.userId }
        const deleteTodo = await Todo.findOneAndDelete(todoDeleteCondition)
        try {
            return res
                .status(200)
                .json({
                    success: true,
                    message: 'Xoá thành công',
                    todo: deleteTodo
                })
        } catch (error) {
            
        }
    }

TodoController.getOneTodo = async (req, res) => {
    try {
        // const todoReq = { _id: req.params.id, user: req.userId }
        // const todo = await Todo.findById(todoReq._id)
        const todo = await Todo.findById(req.params.id)
        return res
            .status(200)
            .json({
                message: 'Lấy todo thanh công',
                todo: todo
            })
    } catch (error) {
        return res
            .status(400)
    }
},

    TodoController.getAllTodos = async (req, res) => {
        try {
            const todos = await Todo.find({ user: req.userId }).populate('user', [
                'username'
            ])
            return res
                .status('200')
                .json({ success: true, message: "lấy thành todos công", todos })

        } catch (error) {
            res
                .status(400)
        }
    }
module.exports = TodoController