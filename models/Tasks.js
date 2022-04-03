const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {type: String, required: true},
    body: String,
    // Tasks can be associated with both Users and Projects, but neither is required
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;