const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users.map((user) => {
        const {
          name,
          about,
          avatar,
          _id,
        } = user;
        return {
          _id,
          name,
          about,
          avatar,
        };
      }));
    })
    .catch(next);
};

module.exports.getIdUsers = (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
