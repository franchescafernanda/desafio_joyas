const express = require('express');
const router = express.Router();
const joyasModel = require('../models/joyasModel');

router.get('/', async (req, res) => {
  try {
    const { limits, page, order_by } = req.query;
    res.json({ message: 'Endpoint /joyas en construcción' });
  } catch (error) {
    console.error('Error en la ruta /joyas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
