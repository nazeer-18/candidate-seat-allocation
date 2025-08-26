import React, { useState } from 'react';
import './StudentForm.css';

const StudentForm = () => {
    const [rollNo, setRollNo] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [error, setError] = useState('');
    const API_URL = 'https://candidate-seat-allocation.onrender.com';

    const fetchStudentDetails = async () => {
        try {
            const res = await fetch(`${API_URL}/api/get-student/${rollNo}`);
            if (res.status === 404) {
                setStudentDetails(null);
                setError('User does not exist');
                return;
            }
            const data = await res.json();
            setStudentDetails(data);
            setError('');
        } catch (error) {
            setError('Error fetching student details');
        }
    };

    const allotSeat = async () => {
        try {
            const res = await fetch(`${API_URL}/api/allot-seat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rollNo })
            });
            const data = await res.json();
            setStudentDetails(data);
        } catch (error) {
            setError('Error allotting seat');
        }
    };

    return (
        <div className="student-form-container">
            <h2>Student Seat Allotment</h2>
            <input
                type="text"
                placeholder="Enter Roll Number"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
            />
            <button onClick={fetchStudentDetails}>Fetch Details</button>
            {error && <div className="error-message">{error}</div>}
            {studentDetails && (
                <div className="student-details">
                    <p><strong>Name:</strong> {studentDetails.name}</p>
                    <p><strong>Roll No:</strong> {studentDetails.rollNo}</p>
                    <p><strong>Validated:</strong> {studentDetails.validated ? 'Yes' : 'No'}</p>
                    <p><strong>Seat Number:</strong> {studentDetails.seatNumber || 'Not allotted'}</p>
                    {!studentDetails.validated && (
                        <button onClick={allotSeat}>Allot Seat</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentForm;