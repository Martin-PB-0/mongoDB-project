const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 7,
        max: 150,
        trim: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
        maxlength: 24
    }
});
const User = mongoose.model('User', usersSchema);
module.exports.userdata = User;