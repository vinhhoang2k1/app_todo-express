const mongoose = require('mongoose')
const {Schema} = mongoose

const ToDoSchema = Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('todos', ToDoSchema)