const pool = require('../config/dbConfig');

// para obtener las joyas
const getAllJoyas = async () => {
  try {
    const query = 'SELECT * FROM inventario';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener las joyas: ${error.message}`);
  }
};

// para dividir segun el precio minimo, maximo, categoria y metales
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

// para exportar
module.exports = {
  getAllJoyas,
  filterJoyas
};
