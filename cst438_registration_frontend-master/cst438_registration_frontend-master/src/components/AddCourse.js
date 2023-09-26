import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
function AddCourse(props) { 

  const [open, setOpen] = useState(false);
  const [course_id, setCourse_id] = useState(0);
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCourse_id( event.target.value);
  }

// Save course and close modal form
  const handleAdd = () => {
      props.addCourse(course_id);
      handleClose();
  }

  return (
      <div>
        <Button id="addCourse" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Course
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Course</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="courseId" autoFocus fullWidth label="Course Id" name="course_id" onChange={handleChange}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddCourse.propTypes = {
  addCourse : PropTypes.func.isRequired
}

export default AddCourse;