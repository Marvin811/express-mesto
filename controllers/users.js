const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users.map((user) => {
        const {
          name, about, avatar, _id,
        } = user;
        return {
          _id, name, about, avatar,
        };
      }));
    })
    .catch(next);
};

const createUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers, createUsers,
};
