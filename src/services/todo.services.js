const TodoModel = require('../models/todo.models')
const TodoServices = {}

TodoServices.getAllTodos = async () => {
    return await TodoModel.find({})
}