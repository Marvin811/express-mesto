const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некоректные данные.'));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};

module.exports.getIdUsers = (req, res, next) => {
  User.findById(req.params.id)
    .then((users) => {
      if (users) {
        res.status(200)
          .send(users);
      } else {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};

module.exports.createUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некоректные данные.'));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      } else {
        next(new BadRequestError('Переданы некоректные данные.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      } else {
        next(new BadRequestError('Переданы некоректные данные.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};
