import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

function AdminHome() {
  // State to store the list of students
  const [students, setStudents] = useState([]);
  const jtwToken = sessionStorage.getItem('jwt');

  // Fetch the list of students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch the list of students from the server
  const fetchStudents = () => {
    fetch('http://localhost:8080/student', {headers: {'Authorization': jtwToken, }, })
      .then((response) => response.json())
      .then((data) => setStudentList(data))
      .catch((error) => {
        console.error("Error fetching students: " + error);
      });
  };

  // Function to add a new student
  const addStudent = (student) => {
    setMessage('');

    fetch('http://localhost:8080/student', {
        method: 'POST',
        headers: { 'Authorization': jtwToken, 'Content-Type': 'application/json', },
        body: JSON.stringify(student), })
        .then((res) => {
            if (res.ok) {
                setMessage('Student was added.');
                fetchStudents(); 
            } else {
                setMessage('Error. ' + res.status);
            }
        })
        .catch((err) => {
            //console.error('exception addStudent ' + err);
            setMessage('Exception. ' + err);
        });
  };

  const editStudent = (studentId, updatedStudent) => {
    setMessage('');

    fetch(`${SERVER_URL}/student/${studentId}`, {
        method: 'PUT', 
        headers: { 'Authorization': jtwToken, 'Content-Type': 'application/json', },
        body: JSON.stringify(updatedStudent), })
        .then((res) => {
            if (res.ok) {
                setMessage('Student was edited.');
                fetchStudents(); 
            } else {
                setMessage('Error. ' + res.status);
            }
        })
        .catch((err) => {
            //console.error('exception editStudent ' + err);
            setMessage('Exception. ' + err);
        });
  };

  // Function to delete a student
  const deleteStudent = (event) => {
    setMessage('');
    const rowID = event.target.parentNode.parentNode.rowIndex - 1;
    const studentId = students[rowID].studentId;

    if (window.confirm('Are you sure you want to delete the student?')) {
        fetch(`http://localhost:8080/student/${studentId}?force=true`, {
            method: 'DELETE',
            headers: { 'Authorization': token, }, })
            .then((res) => {
                if (res.ok) {
                    setMessage('Student deleted.');
                    fetchStudents();
                } else {
                    setMessage('Error deleteStudent. ' + res.status);
                }
            })
            .catch((err) => {
                //console.log('exception deleteStudent ' + err);
                setMessage('Exception. ' + err);
            });
    }
  };

  // Function to remove a student from the list
  // const removeStudent = (studentId) => {
  //   if (window.confirm('Are you sure you want to remove this student?')) {
  //     fetch(`http://localhost:8080/student/${studentId}?force=yes`, {
  //       method: 'DELETE',
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Student removed successfully");
  //           fetchStudents(); // Refresh the student list
  //         } else {
  //           console.error("Error removing student");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error removing student: " + error);
  //       });
  //   }
  // };

  // Table header
  const headers = ['Student ID', 'Name', 'Email', 'Status Code', 'Status', '', ''];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>List Students</h3>
      <table style={{ margin: '0 auto', width: '80%' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((row, idx) => (
            <tr key={idx}>
              <td>{row.studentId}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.statusCode}</td>
              <td>{row.status}</td>
              <td>
                <EditStudent
                  id="editStudent"
                  initialStudent={row}
                  editStudent={(updatedStudent) => editStudent(row.studentId, updatedStudent)}/>
              </td>
            <td>
              <button id="deleteStudent" type="button" margin="auto" onClick={deleteStudent}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddStudent id="addStudent" addStudent={addStudent} />
    </div>
  );
}

export default AdminHome;