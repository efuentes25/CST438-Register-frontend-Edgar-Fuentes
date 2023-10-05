import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditStudent = (properties)  => {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        student_id: properties.student.studentId,
        name: properties.student.name,
        email: properties.student.email
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prevState => ({...prevState, [name]: value}));
    };

    const handleEdit = () => {
        editStudent();
        if (properties.onUpdate) {
            properties.onUpdate();
        }
        handleClose();
    };

    const editStudent = () => {
        fetch(`http://localhost:8080/student/${student.student_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        })
        .then(res => {
            if (!res.ok) {
                console.log('Error editing student:', res.status);
            }
        })
        .catch(err => {
            console.error("Exception editing student:", err);
        });
    }

    return (
        <div>
            <Button style={{backgroundColor: 'blue', color: 'white'}}
            onClick={handleClickOpen}>
                Edit Student
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>

                <DialogContent style={{ paddingTop: 20 }}>
                    <TextField id="name" value={student.name} autoFocus fullWidth label="name" name="name" onChange={handleChange}/>
                    <TextField id="email" value={student.email} fullWidth label="email" name="email" onChange={handleChange}/>
                </DialogContent>

                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="edit" color="primary" onClick={handleEdit}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditStudent;