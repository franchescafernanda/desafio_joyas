const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const joyasRoutes = require('./routes/joyasRoutes');
const filtrosRoutes = require('./routes/filtroRoutes');
const reportMiddleware = require('./middlewares/reportMiddleware');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

app.use(reportMiddleware);

app.use((req, res, next) => {
  console.log(`Consulta a la ruta: ${req.path}`);
  next();
});

app.use('/joyas', joyasRoutes);
app.use('/joyas/filtros', filtrosRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
