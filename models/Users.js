const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: String,
    // Adding password for now. May remove later depending on how I handle auth
    password: {type: String, default: 'admin'},
    tasks: [],
    projects: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;