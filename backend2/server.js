const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const plantRoutes = require('./routes/plants');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api/plants', plantRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Microservice Plantes lancé sur http://localhost:${PORT}`));
