const mysql = require('mysql2');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'containers-us-west-108.railway.app',
  user: 'root',
  password: 'hymUFxpLzqy8ThjLiJIP',
  database: 'railway',
  port: 6236
});

// Intenta conectar
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});
