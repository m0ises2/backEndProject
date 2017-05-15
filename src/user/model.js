const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
  fullname: {
    type: String,
    maxlength: 60,
    required: true
  },
  email: {
    type: String,
    maxlength: 35,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  client: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
