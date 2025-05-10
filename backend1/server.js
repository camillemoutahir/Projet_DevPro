const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const flowerRoutes = require('./routes/flowers');
require('dotenv').config();
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api/flowers', flowerRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Microservice Fleurs lancé sur http://localhost:${PORT}`));