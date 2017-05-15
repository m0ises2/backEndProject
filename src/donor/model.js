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
    type: Datetype: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/*
  Middleware del tipo pre.
  Más información -> http://mongoosejs.com/docs/middleware.html
  Función que se ejecutará antes de que el evento save ocurra en mongoose:
*/
donorSchema.pre('save', (next) => {
  next();
  /*let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    // Callback hell. Buen momento para usar promesas :D
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })*/
});

module.exports = mongoose.model('Donor', donorSchema);
