const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {type: String, required: true},
    proj_desc: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;