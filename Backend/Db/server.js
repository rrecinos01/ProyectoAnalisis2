const express = require('express');
const app = express();

// Importa el enrutador de empleados
const empleadosRouter = require('../apis/empleados'); // Ajusta la ruta según tu estructura de carpetas

// Usa el enrutador de empleados para manejar las rutas relacionadas con empleados
app.use('/api/empleados', empleadosRouter);

// Inicia el servidor en un puerto específico
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
