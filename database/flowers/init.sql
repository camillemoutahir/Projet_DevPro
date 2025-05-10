CREATE TABLE IF NOT EXISTS flowers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT
);
