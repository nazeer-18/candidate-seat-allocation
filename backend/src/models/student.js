const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    seatNumber: {
        type: String,
        default: ''
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;