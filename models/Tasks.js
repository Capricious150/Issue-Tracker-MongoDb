const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {type: String, required: true},
    body: String,
    notes: [],
    // Tasks can be associated with both Users and Projects, but neither is required
    owner: String,
    project: String,
    resolved: {type: Boolean, default: false},
    created_on: {type: Date, default: Date.now},
    resolved_on: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;