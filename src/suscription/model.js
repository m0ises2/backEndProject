const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suscriptionSchema = Schema({
  suscriptionId: {
    type: String,
    required: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  typeCard: {
    type: String,
    enum: ['crédito', 'débito']
  },
  brandCard: {
    type: String,
    enum: ['visa', 'mastercard', 'amex']
  },
  lastDigits: {
    type: Number,
    required: true
  },
  initData: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Suscription', suscriptionSchema);
