const mongoose = require('mongoose');
const validator = require('validator');

const validateUrl = /^(https?:\/\/)((((www\.)?[\w\d](([\w\d.-]+)*)[\w\d]*\.(([a-z]{2,})\.?)+)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(:(?=[1-9])([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?)?)(\/(?!\/)[\w\d]*)*?#?(\.\w{2,})?$/;
// const validateEmail = /((\w)|(-))+@([a-zA-Z0-9_\-\.]+)\.(([a-zA-Z]{2,})\.?)+/;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validateUrl.test(v),
      message: 'Нужно ввести ссылку, а не вот это вот всё..',
    },
    required: true,
  },
  email: {
    required: true,
    unique: true,
  },
  password: {
    required: true,
  },
});

module.exports = mongoose.model('user', usersSchema);
