const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentname: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 8,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        min: 7,
        max: 150,
        trim: true
    },
    sex: {
        type: String,
        require: true
    },
    email: String,
    hobbies: {
        type: [String]
    },
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now,
        // 未指定默认为提交时间
    }
});
const Student = mongoose.model('Sdutent', studentSchema);
module.exports = Student;