const express = require('express');
const router = express.Router();
const joyasModel = require('../models/joyasModel');

router.get('/', async (req, res) => {
  try {
    const { precio_min = 0, precio_max = Number.MAX_VALUE, categoria, metal } = req.query;
    const joyas = await joyasModel.filterJoyas(precio_min, precio_max, categoria, metal);

    res.json({
      total: joyas.length,
      joyas
    });
  } catch (error) {
    console.error('Error en la ruta /joyas/filtros:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
