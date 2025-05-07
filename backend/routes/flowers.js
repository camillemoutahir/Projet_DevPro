const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flowerController');

router.get('/', flowerController.getAll);
router.post('/', flowerController.add);
router.delete('/:id', flowerController.delete);

module.exports = router;
