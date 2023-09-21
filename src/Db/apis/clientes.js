import { executeQuery } from '../conexionDb/db';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        let result = await executeQuery('EXEC ObtenerUsuarioList');
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        // Aquí puedes manejar tu consulta POST
        // Por ejemplo, podrías insertar un nuevo cliente en la base de datos
        // Deberías obtener los datos del nuevo cliente del cuerpo de la solicitud (req.body)
        // Para hacer esto, necesitarás instalar y utilizar el middleware body-parser
        let result = await executeQuery(`EXEC InsertarCliente ${req.body.nombre}`);
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
