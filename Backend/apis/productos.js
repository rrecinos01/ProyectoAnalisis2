import { executeQuery } from '../conexionDb/db';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        let result = await executeQuery('EXEC ProductoList');
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        let referencia = req.body.email;
        let password = req.body.password;
        let result = await executeQuery(`EXEC AgregarProductoCompra '${email}','${password}'`);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
