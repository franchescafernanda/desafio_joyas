
const express = require('express');
const router = express.Router();
const joyasModel = require('../models/joyasModel');

router.get('/', async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    res.json({ message: 'Endpoint /joyas/filtros en construcción' });
  } catch (error) {
    console.error('Error en la ruta /joyas/filtros:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
