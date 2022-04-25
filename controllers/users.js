/* eslint-disable no-unused-vars */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ValidationError = require('../errors/validationError');

const ERROR_NOT_FOUND = 404;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERR = 500;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    next(new ValidationError('Не передан email или пароль'));
  }
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          // httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: 'ошибка 401' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users.map((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      return {
        _id, name, about, avatar,
      };
    })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Нет таких пользователей' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getIdUsers = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(INTERNAL_SERVER_ERR).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      }
      res.status(INTERNAL_SERVER_ERR).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'передан некорректный id' });
      }
      res.status(INTERNAL_SERVER_ERR).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'передан некорректный id' });
      }
      res.status(INTERNAL_SERVER_ERR).send({ message: 'Что-то пошло не так' });
    });
};
