const Teacher = require('../models/teacher');
const Student = require('../models/student');

module.exports = {
  showTeachers: async (req, res, next) => {
    try {
      const query = {};

      const { subject } = req.query;

      if (subject) {
        query.subject = subject.toLowerCase();
      }
      const Teachers = await Teacher.find(query).select('name email subject');

      if (Teachers.length === 0) {
        return res.status(404).json('No teachers found');
      }

      res.json(Teachers);
    } catch (err) {
      next(err);
    }
  },
  showTeacher: async (req, res, next) => {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findById({ _id: id }).select(
        'name email subject'
      );
      if (teacher == null) {
        return res.status(404).json(`No teacher with the id ${id}`);
      }
      res.json(teacher);
    } catch (err) {
      next(err);
    }
  },
  createTeacher: async (req, res, next) => {
    try {
      const { name, email, subject } = req.body;

      const teacher = new Teacher({
        name: name,
        email: email,
        subject: subject.toLowerCase(),
      });
      await teacher.save();
      res.json('Teacher created successfully');
    } catch (err) {
      next(err);
    }
  },
  deleteTeacher: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Teacher.deleteOne({ _id: id });
      res.json('Deleted Teacher successfully');
    } catch (err) {
      next(err);
    }
  },
  updateTeacher: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, subject } = req.body;
      await Teacher.findByIdAndUpdate(
        { _id: id },
        { name: name, email: email, subject: subject }
      );
      res.json('Updated teacher successfully');
    } catch (err) {
      next(err);
    }
  },
  showStudents: async (req, res, next) => {
    try {
      const { id } = req.query;
      if (id) {
        const student = await Teacher.findById({ _id: id })
          .populate('assignedStudent', 'name email class section')
          .select('assignedStudent');
        return res.json(student);
      }
      const students = await Teacher.find()
        .populate('assignedStudent', 'name email class section')
        .select('assignedStudent');
      res.json(students);
    } catch (err) {
      next(err);
    }
  },
  addStudent: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { student_id } = req.body;

      const teacher = await Teacher.findById({ _id: id });
      if (teacher == null) {
        return res.status(404).json(`No teacher with the id ${id}`);
      } else {
        const student = await Student.findById({ _id: student_id });
        if (student == null) {
          return res.status(404).json(`No student with the id ${id}`);
        } else {
          await teacher.assignedStudent.push(student_id);
          await student.assignedTeacher.push(id);
          await teacher.save();
          await student.save();
        }
      }
      res.json(`Assigned teacher ${id} to student ${student_id}`);
    } catch (err) {
      next(err);
    }
  },
};
