import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

function AdminHome() {
  // State to store the list of students
  const [studentList, setStudentList] = useState([]);

  // Fetch the list of students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch the list of students from the server
  const fetchStudents = () => {
    fetch('http://localhost:8080/student')
      .then((response) => response.json())
      .then((data) => setStudentList(data))
      .catch((error) => {
        console.error("Error fetching students: " + error);
      });
  };

  // Function to remove a student from the list
  const removeStudent = (studentId) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      fetch(`http://localhost:8080/student/${studentId}?force=yes`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log("Student removed successfully");
            fetchStudents(); // Refresh the student list
          } else {
            console.error("Error removing student");
          }
        })
        .catch((error) => {
          console.error("Error removing student: " + error);
        });
    }
  };

  // Table header
  const tableHeaders = ['Student ID', 'Name', 'Email', 'Status Code', 'Status', '', ''];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Enrolled Students</h3>
      <table style={{ margin: '0 auto', width: '80%' }}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr>
              <td colSpan="7">No students found.</td>
            </tr>
          ) : (
            studentList.map((student, index) => (
              <tr key={index}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.statusCode}</td>
                <td>{student.status}</td>
                <td>
                  <button
                  style={{ backgroundColor: 'red', color: 'white', paddingTop: 20 }} 
                  onClick={() => removeStudent(student.studentId)}>Remove</button>
                </td>
                <td>
                  <EditStudent student={student} onUpdate={fetchStudents} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <AddStudent onClose={fetchStudents} />
    </div>
  );
}

export default AdminHome;