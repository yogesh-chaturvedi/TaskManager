const mongoose = require('mongoose')


const TasksSchema = new mongoose.Schema({

    assignedTo: {
        type: String,
        required: true
    },
    taskCategory: {
        type: String,
        required: true
    },
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        default: 'New'
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deadLine: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Tasks = mongoose.model('Tasks', TasksSchema);

module.exports = Tasks;