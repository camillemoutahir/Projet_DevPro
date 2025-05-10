const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

router.get('/', plantController.getAll);
router.post('/', plantController.add);
router.delete('/:id', plantController.delete);

module.exports = router;
