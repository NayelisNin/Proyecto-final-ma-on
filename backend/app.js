const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/libroRoutes'));

// conexión
sequelize.authenticate()
    .then(() => console.log("✔ DB conectada"))
    .catch(err => console.log("❌ DB error:", err));

// ⚠️ IMPORTANTE: NO BORRA TABLAS
sequelize.sync({ alter: true })
    .then(() => console.log("✔ Tablas sincronizadas"))
    .catch(err => console.log("❌ Sync error:", err));

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});