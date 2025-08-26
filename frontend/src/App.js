import React, { useState } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';

const App = () => {
  const [student, setStudent] = useState(null);
  const [rollNo, setRollNo] = useState('');

  const fetchStudentDetails = async (rollNo) => {
    try {
      const response = await axios.get(`/student/${rollNo}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const allotSeat = async () => {
    try {
      const response = await axios.post('/student/allot-seat', { rollNo });
      setStudent(response.data);
    } catch (error) {
      console.error('Error allotting seat:', error);
    }
  };

  return (
    <div>
      <StudentForm 
        rollNo={rollNo} 
        setRollNo={setRollNo} 
        fetchStudentDetails={fetchStudentDetails} 
        allotSeat={allotSeat} 
      />
      {student && (
        <div>
          <h2>Student Details</h2>
          <p>Name: {student.name}</p>
          <p>Roll No: {student.rollNo}</p>
          <p>Validated: {student.validated ? 'Yes' : 'No'}</p>
          <p>Seat Number: {student.seatNumber || 'Not assigned'}</p>
        </div>
      )}
    </div>
  );
};

export default App;