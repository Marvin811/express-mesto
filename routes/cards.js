const router = require('express').Router();
const { getCards, createCards } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCards);

module.exports = router;
