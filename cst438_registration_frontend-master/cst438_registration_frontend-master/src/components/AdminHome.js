import React, { useState, useEffect } from 'react';

const AdminHome = ()  => {

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
		//TODO complete this method to fetch students and display list of students
    }


    return (
        <div> 
        <div margin="auto" >
          <h3>Student List</h3>
        </div>
      </div>
    )
}

export default AdminHome;