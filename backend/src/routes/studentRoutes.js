const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to fetch student details by roll number
router.get('/get-student/:rollNo', studentController.getStudentDetails);

// Route to allot a random seat to the student
router.post('/allot-seat', studentController.allotSeat);

// Route to add a new student
router.post('/add-student', studentController.addStudent);

module.exports = router;