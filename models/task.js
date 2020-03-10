const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {type: String},
    status: {
        type: String,
        required: true,
        enum: ["new", "in_progress", "complete"]
    }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;