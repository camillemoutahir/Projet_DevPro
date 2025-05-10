const flowerModel = require('../models/flowerModel');

exports.getAll = async (req, res) => {
  try {
    const flowers = await flowerModel.getAllFlowers();
    res.json(flowers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.add = async (req, res) => {
  const { name, image_url, description } = req.body;
  try {
    await flowerModel.addFlower(name, image_url, description);
    res.status(201).json({ message: 'Fleur ajoutée !' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la fleur' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await flowerModel.deleteFlower(id);
    res.status(201).json({ message: 'Fleur supprimée !' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la fleur' });
  }
};