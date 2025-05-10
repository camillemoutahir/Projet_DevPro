const db = require('../database/db');

exports.getAllPlants = async () => {
  const result = await db.query(`
    SELECT plants.*, plant_types.name as type_name
    FROM plants
    JOIN plant_types ON plants.type_id = plant_types.id
  `);
  return result.rows;
};

exports.addPlant = async (name, type_id, last_watered, notes) => {
  await db.query(
    'INSERT INTO plants (name, type_id, last_watered, notes) VALUES ($1, $2, $3, $4)',
    [name, type_id, last_watered, notes]
  );
};

exports.deletePlant = async (id) => {
  await db.query('DELETE FROM plants WHERE id = $1', [id]);
};
