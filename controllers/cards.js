/* eslint-disable no-unused-vars */
const BadRequestError = require('../errors/badRequestError');
const InternalServerError = require('../errors/internalServerError');
const NotFoundError = require('../errors/notFoundError');
const Card = require('../models/card');


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки. '));
      } else {
        next(new InternalServerError('Ошибка.'));
      }
    });
};

module.exports.deleteCards = (req, res, next => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id.toString()) {
          card.remove();
          res.status(200).send(card);
        } else {
          next(new NotFoundError('Пользователь по указанному _id не найден'));
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(new InternalServerError('Ошибка.'))
      }
    })
}

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(new InternalServerError('Ошибка.'))
      }
    })
};

module.exports.dislikeCard = (req, res,) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (card) {
      res.status(200).send(card);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(new InternalServerError('Ошибка.'))
    }
  })
};
