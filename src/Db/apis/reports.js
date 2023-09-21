const { poolPromise, sql } = require('../conexionDb/db');

exports.getSomeData = async function() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM SomeTable');

    return result.recordset;
  } catch (err) {
    console.error('Error de SQL', err);
  }
};