const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const pool = require('../database/db');

router.get('/', plantController.getAll);
router.post('/', plantController.add);
router.delete('/:id', plantController.delete);

router.get('/plant-types', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plant_types');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des types de plantes', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;