const router = require('express').Router();
const { getCards, deleteCards, createCards } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCards);
router.post('/', createCards);

module.exports = router;
