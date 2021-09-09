const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  assignedTeacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teachers',
    },
  ],
});

module.exports = mongoose.model('Students', studentSchema);
