const Router = require('express').Router();

const {
  showStudents,
  showStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  showTeacher,
  addTeacher,
} = require('../controller/student.controller');

Router.get('/all', showStudents);

Router.get('/one/:id', showStudent);

Router.post('/', createStudent);

Router.delete('/:id', deleteStudent);

Router.patch('/:id', updateStudent);

Router.get('/show-teacher/', showTeacher);

Router.put('/add-teacher/:id', addTeacher);

module.exports = Router;
