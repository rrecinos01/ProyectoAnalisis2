import { executeQuery } from '../conexionDb/db';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        let email = req.body.email;
        let password = req.body.password;
        
        let result = await executeQuery(`EXEC UserLogin '${email}','${password}'`);
        if (result && result.length > 0 && result[0].Message === 'Login exitoso') {
            // Si el inicio de sesión es exitoso, almacena el No_documento en una cookie.
            res.setHeader('Set-Cookie', `No_documento=${result[0].No_documento}; Path=/; HttpOnly`);
            res.status(200).json(result[0]);
          } else {
            // Si el inicio de sesión falla, envía un error.
            res.status(401).json({ message: 'Inicio de sesión fallido' });
          }
          
          
      } catch (err) {
        console.error(err); // Imprime el error en la consola para depuración
        res.status(500).json({ message: 'Error interno en el servidor' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
