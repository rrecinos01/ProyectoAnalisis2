const sql = require('mssql');

const config = {
  server: 'SERVER4',
  authentication:{
    type:'default',
    options:{
      userName: 'sa',
      password:'Bases.333'
    }
  },
  options:{
    port:1433,
    database:'proyec',
    trustServerCertificate:true
  }
};

export const executeQuery = async (query) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    throw new Error(err.message);
  }
};
