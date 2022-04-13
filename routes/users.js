const router = require('express').Router();
const { getUsers, createUsers } = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsers);
// возвращает пользователя по _id
// router.get('/:userId', getId);
// создаёт пользователя
// eslint-disable-next-line no-undef
router.post('/', express.json(), createUsers);

module.exports = router;
