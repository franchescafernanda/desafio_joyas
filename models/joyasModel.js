const pool = require('../config/dbConfig');

const getAllJoyas = async (limits, page, order_by) => {
  try {
    const offset = (page - 1) * limits;
    const query = `SELECT * FROM inventario ORDER BY ${order_by.split('_')[0]} ${order_by.split('_')[1]} LIMIT $1 OFFSET $2`;
    const values = [limits, offset];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener las joyas: ${error.message}`);
  }
};

const filterJoyas = async (precio_min, precio_max, categoria, metal) => {
  try {
    const query = 'SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria = $3 AND metal = $4';
    const values = [precio_min, precio_max, categoria, metal];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al filtrar las joyas: ${error.message}`);
  }
};

module.exports = {
  getAllJoyas,
  filterJoyas
};
