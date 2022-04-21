const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'имя пользователя не может быть короче двух символов'],
    maxlength: [30, 'имя пользователя не может быть длиннее 30 символов'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'информация о пользователе не может быть короче двух символов'],
    maxlength: [30, 'информация о пользователе не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
