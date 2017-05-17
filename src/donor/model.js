const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = Schema({
  donorId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  birthdate: {
    type: Date
  },
  phone: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  slug: {
    type: String,
    lowercase: true
  },
  clientid: {
    type: String,
		required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donor', donorSchema);
