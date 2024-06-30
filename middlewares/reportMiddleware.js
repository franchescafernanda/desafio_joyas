const fs = require('fs');
const path = require('path');

const reportMiddleware = (req, res, next) => {
  const log = `Ruta: ${req.path} - Método: ${req.method} - Fecha y hora: ${new Date().toISOString()}\n`;
  fs.appendFile(path.join(__dirname, '../logs/reports.log'), log, (err) => {
    if (err) {
      console.error('Error al escribir el log:', err.message);
    }
  });
  next();
};

module.exports = reportMiddleware;
