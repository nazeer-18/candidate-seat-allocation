const Student = require('../models/student');

exports.getStudentDetails = async (req, res) => {
    const { rollNo } = req.params;
    try {
        const student = await Student.findOne({ rollNo });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.allotSeat = async (req, res) => {
    const { rollNo } = req.body;
    const seatNumber = Math.floor(Math.random() * 100) + 1; // Random seat number between 1 and 100
    try {
        const student = await Student.findOneAndUpdate(
            { rollNo },
            { seatNumber, validated: true },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, rollNo } = req.body;
        const student = new Student({ name, rollNo });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: 'Error adding student', error });
    }
};