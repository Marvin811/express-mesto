const router = require('express').Router();
const {
  getUsers, getIdUsers, getCurrentUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getIdUsers);
router.get('/users/me', getCurrentUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
