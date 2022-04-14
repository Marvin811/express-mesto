const router = require('express').Router();
const { getUsers, getIdUsers, createUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getIdUsers);
router.post('/', createUsers);

module.exports = router;
