const express = require('express');
const router = express.Router();
const joyasModel = require('../models/joyasModel');

router.get('/', async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    const joyas = await joyasModel.getAllJoyas(limits, page, order_by);
    const totalJoyas = joyas.length;

    const hateoas = joyas.map((joya) => ({
      ...joya,
      href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${joya.id}`
    }));

    res.json({
      total: totalJoyas,
      joyas: hateoas,
      links: {
        self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        next: `${req.protocol}://${req.get('host')}${req.originalUrl}?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
        prev: `${req.protocol}://${req.get('host')}${req.originalUrl}?limits=${limits}&page=${parseInt(page) - 1 > 0 ? parseInt(page) - 1 : 1}&order_by=${order_by}`
      }
    });
  } catch (error) {
    console.error('Error en la ruta /joyas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
