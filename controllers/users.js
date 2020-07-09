const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    user
      .create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
      .then((users) => res.send({ data: users }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err });
        } else {
          res.status(500).send({ message: err });
        }
      });
  });
};

module.exports.getUser = async (req, res) => {
  try {
    const userObj = await user.findById(req.params.userId).orFail(new Error('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН'));
    return res.json({ userObj });
  } catch (err) {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return user
    .findUserByCredentials(email, password)
    .then((userObj) => {
      const token = jwt.sign({ _id: userObj._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
