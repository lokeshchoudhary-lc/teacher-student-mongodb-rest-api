const Router = require('express').Router();

const {
  showTeachers,
  showTeacher,
  createTeacher,
  deleteTeacher,
  updateTeacher,
  showStudents,
  addStudent,
} = require('../controller/teacher.controller');

Router.get('/all', showTeachers);

Router.get('/one/:id', showTeacher);

Router.post('/', createTeacher);

Router.delete('/:id', deleteTeacher);

Router.patch('/:id', updateTeacher);

Router.get('/show-student/', showStudents);

Router.put('/add-student/:id', addStudent);

module.exports = Router;
