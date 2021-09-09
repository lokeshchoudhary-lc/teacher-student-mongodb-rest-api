const Student = require('../models/student');
const Teacher = require('../models/teacher');

module.exports = {
  showStudents: async (req, res, next) => {
    try {
      const query = {};

      const { class: Class, section } = req.query;

      if (Class && section) {
        parseInt(Class);
        query.class = Class;
        query.section = section.toLowerCase();
      }

      if (Class) {
        parseInt(Class);
        query.class = Class;
      }
      if (section) {
        query.section = section.toLowerCase();
      }

      const students = await Student.find(query).select(
        'name email class section'
      );

      if (students.length === 0) {
        return res.status(404).json('No students found');
      }

      res.json(students);
    } catch (err) {
      next(err);
    }
  },
  showStudent: async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await Student.findById({ _id: id }).select(
        'name email class section'
      );
      if (student == null) {
        return res.status(404).json(`No student with the id ${id}`);
      }
      res.json(student);
    } catch (err) {
      next(err);
    }
  },
  createStudent: async (req, res, next) => {
    try {
      const { name, email, class: Class, section } = req.body;
      const student = new Student({
        name: name,
        email: email,
        class: Class,
        section: section.toLowerCase(),
      });
      await student.save();
      res.json('Student created successfully');
    } catch (err) {
      next(err);
    }
  },
  deleteStudent: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Student.deleteOne({ _id: id });
      res.json('Deleted student successfully');
    } catch (err) {
      next(err);
    }
  },
  updateStudent: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, class: Class, section } = req.body;
      await Student.findByIdAndUpdate(
        { _id: id },
        { name: name, email: email, class: Class, section: section }
      );
      res.json('Updated student successfully');
    } catch (err) {
      next(err);
    }
  },
  showTeacher: async (req, res, next) => {
    try {
      const { id } = req.query;
      if (id) {
        const teacher = await Student.findById({ _id: id })
          .populate('assignedTeacher', 'name email subject')
          .select('assignedTeacher');
        return res.json(teacher);
      }
      const teachers = await Student.find()
        .populate('assignedTeacher', 'name email subject')
        .select('assignedTeacher');
      res.json(teachers);
    } catch (err) {
      next(err);
    }
  },
  addTeacher: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { teacher_id } = req.body;

      const student = await Student.findById({ _id: id });

      if (student == null) {
        return res.status(404).json(`No student with the id ${id}`);
      } else {
        const teacher = await Teacher.findById({ _id: teacher_id });
        if (teacher == null) {
          return res.status(404).json(`No teacher with the id ${id}`);
        } else {
          await student.assignedTeacher.push(teacher_id);
          await teacher.assignedStudent.push(id);
          await teacher.save();
          await student.save();
        }
      }

      res.json(`Assigned student ${id} to teacher ${teacher_id}`);
    } catch (err) {
      next(err);
    }
  },
};
