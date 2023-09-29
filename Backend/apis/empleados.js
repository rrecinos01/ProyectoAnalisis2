// routes/empleados.js

const express = require('express');
const router = express.Router();

// Importa la conexión a la base de datos
const db = require('../conexionDb/db'); // Ajusta la ruta según tu estructura de carpetas

// Define la función que realiza la consulta a la tabla
async function getTableData(req, res) {
  try {
    // Realiza la consulta SQL a la tabla
    const query = 'SELECT * FROM empleado';
    const [rows] = await db.promise().query(query);

    // Envia los datos como respuesta en formato JSON
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

// Configura una ruta relativa para tu API
router.get('/', getTableData);

module.exports = router;
