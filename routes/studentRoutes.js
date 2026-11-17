const express = require('express');
const router = express.Router();
let students = require('../data/students');

// GET /students - Retrieve all students
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// GET /students/:id - Retrieve a single student by ID
router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            error: 'Student not found'
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// POST /students - Create a new student record
router.post('/', (req, res) => {
    const { name, email, course, age } = req.body;

    // Validate request body
    if (!name || !email || !course || !age) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields: name, email, course, age'
        });
    }

    // Generate new ID
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    const newStudent = {
        id: newId,
        name,
        email,
        course,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: newStudent
    });
});

// PUT /students/:id - Update an existing student record
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Student not found'
        });
    }

    const { name, email, course, age } = req.body;

    // Optional validation or partial update support
    const updatedStudent = {
        id: studentId,
        name: name !== undefined ? name : students[studentIndex].name,
        email: email !== undefined ? email : students[studentIndex].email,
        course: course !== undefined ? course : students[studentIndex].course,
        age: age !== undefined ? Number(age) : students[studentIndex].age
    };

    students[studentIndex] = updatedStudent;

    res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: updatedStudent
    });
});

// DELETE /students/:id - Delete a student record
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Student not found'
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
        data: deletedStudent[0]
    });
});

module.exports = router;
