const plantModel = require('../models/plantModel');

exports.getAll = async (req, res) => {
  try {
    const plants = await plantModel.getAllPlants();
    res.json(plants);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.add = async (req, res) => {
  const { name, type_id, last_watered, notes } = req.body;
  try {
    await plantModel.addPlant(name, type_id, last_watered, notes);
    res.status(201).json({ message: 'Plante ajoutée !' });
  } catch (error) {
    console.error('Erreur SQL:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la plante' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await plantModel.deletePlant(id);
    res.status(201).json({ message: 'Plante supprimée !' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la plante' });
  }
};
