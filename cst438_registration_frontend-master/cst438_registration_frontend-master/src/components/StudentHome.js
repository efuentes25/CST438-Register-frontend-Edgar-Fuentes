import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {SEMESTERS} from '../constants'

  /* 
   *  display list of terms (year, semester) from SEMESTERS list
   *  user selects from the list displayed and can view schedule
   */
function StudentHome( ) {

  const [termId, setTermId] = useState(-1);

  const onRadioClick = (event) => {
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    console.log("radioClick "+row_id);
    setTermId(row_id);
  }

  const headers = [' ', 'Year', 'Semester'];  

  return(
    <div margin="auto" >
      <table className="Center"> 
        <thead>
          <tr>
            {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {SEMESTERS.map((row,idx) => (
            <tr key={idx}>
              <td><input type="radio"  name="term" onClick={onRadioClick}/></td>
              <td>{row.year}</td>
              <td>{row.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link id="viewSchedule" to={`/schedule?termId=${termId}`} > View Schedule </Link>
    </div>
  );
}
export default StudentHome;