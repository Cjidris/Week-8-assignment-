
const gradstudent = mongoose.model('cluster0', gradstudentSchema);

module.exports = gradstudent;

const mongoose = require('mongoose');

const gradstudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],

    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
    max: [99, 'Age must be less than 100']
  }
});

const User = mongoose.model('cluster0', gradstudentSchema);

module.exports = gradstudent;

