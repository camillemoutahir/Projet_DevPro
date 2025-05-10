CREATE TABLE plant_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  watering_frequency_days INT
);

CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type_id INT,
  last_watered DATE,
  notes TEXT,
  FOREIGN KEY (type_id) REFERENCES plant_types(id) ON DELETE CASCADE
);

INSERT INTO plant_types (name, watering_frequency_days) VALUES
  ('Plante tropicale', 7),
  ('Cactus', 30),
  ('Plante grasse', 21),
  ('Fougère', 4),
  ('Orchidée', 10),
  ('Plante d''intérieur', 14),
  ('Plante aquatique', 3),
  ('Bonsaï', 5),
  ('Palmier', 10),
  ('Plante aromatique', 2);