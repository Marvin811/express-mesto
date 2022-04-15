const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards.map((card) => card));
    })
    .catch(next);
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCards = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id.toString()) {
          card.remove();
          res.status(200).send(card);
        }
      }
    });
};
