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

router.patch('/:id/water', async (req, res) => {
  const { id } = req.params;
  const { last_watered } = req.body;

  try {
    await pool.query('UPDATE plants SET last_watered = $1 WHERE id = $2', [last_watered, id]);
    res.json({ message: 'Plante arrosée' });
  } catch (err) {
    console.error('Erreur lors de l\'arrosage de la plante', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;