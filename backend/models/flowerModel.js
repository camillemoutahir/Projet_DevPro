const db = require('../database/db');

exports.getAllFlowers = async () => {
  const result = await db.query('SELECT * FROM flowers');
  return result.rows;
};

exports.addFlower = async (name, image_url, description) => {
  await db.query('INSERT INTO flowers (name, image_url, description) VALUES ($1, $2, $3)', [name, image_url, description]);
};

exports.deleteFlower = async (id) => {
  await db.query('DELETE FROM flowers WHERE id = $1', [id]);
};
