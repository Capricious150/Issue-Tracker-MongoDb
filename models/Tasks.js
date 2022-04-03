const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {type: String, required: true},
    body: String,
    notes: [],
    // Tasks can be associated with both Users and Projects, but neither is required
    owner: String,
    project: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;