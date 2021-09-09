const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  assignedStudent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Students',
    },
  ],
});

module.exports = mongoose.model('Teachers', teacherSchema);
