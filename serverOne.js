import express from 'express';
import users from './userMock.js'; // Archivo local con los datos de los usuarios

const app = express();
const port = process.env.PORT || 3000;

// Middleware global para registrar rutas
app.use((req, res, next) => {
  console.info(`[INFO] ${req.method} ${req.path}`);
  next(); // Continúa con el siguiente middleware o manejador
});

// Middleware para procesar datos JSON
app.use(express.json());

// Middleware para validar y buscar un usuario por ID
const checkUserIdMiddleware = (req, res, next) => {
  const { id } = req.params; // Obtiene el parámetro `id` de la URL
  const userId = parseInt(id); // Convierte el ID a un número entero

  // Verifica si el ID no es un número válido
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' }); // Responde con error 400 si el ID no es válido
  }

  // Busca el usuario en la lista de usuarios
  const user = users.find((user) => user.id === userId);

  // Si no encuentra al usuario, responde con un error 404
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Almacena el usuario encontrado en `req.user` para que esté disponible en el manejador de la ruta
  req.user = user;
  next(); // Continúa con el siguiente middleware o manejador de la ruta
};

//Middleware para validar datos de creación del usuario

// Endpoint específico: Obtener un usuario por ID
// Debe estar antes de `/users` para evitar que esta ruta genérica coincida primero
app.get('/users/:id', checkUserIdMiddleware, (req, res) => {
  res.json(req.user); // Responde con los datos del usuario almacenados en `req.user` por el middleware
});

// Endpoint genérico: Obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users); // Responde con la lista completa de usuarios
});

// Endpoint raíz (genérico): Debe estar al final
app.get('/', (req, res) => {
  res.send('Hello World!'); // Responde con un mensaje básico
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500; // Usa el código de estado del error o 500 por defecto
  res.status(statusCode).json({ error: error.message }); // Responde con el mensaje de error
  console.error(error); // Registra el error en la consola
});

// Inicia el servidor y maneja posibles errores al iniciar
const server = app
  .listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
  .on('error', (err) => {
    // Maneja el error si el puerto ya está en uso
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
      process.exit(1); // Finaliza el proceso
    } else {
      console.error(err); // Registra cualquier otro error
    }
  });

// Manejo de señales del sistema para cerrar el servidor de forma controlada
process.on('SIGINT', () => {
  console.log('SIGINT received: closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
