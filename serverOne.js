import express from 'express';
import users from './userMock.js'; // Archivo local con los datos de los usuarios

const app = express();
const port = process.env.PORT || 3000;

// ========================
// Middlewares Globales
// ========================

// Middleware global para registrar rutas
app.use((req, res, next) => {
  console.info(`[INFO] ${req.method} ${req.path}`);
  next(); // Continúa con el siguiente middleware o manejador
});

// Middleware para procesar datos JSON
app.use(express.json());

// ========================
// Middlewares Específicos
// ========================

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

// Middleware para validar datos de creación del usuario
const validateUser = (req, res, next) => {
  const { nombre, apellido } = req.body;

  // Validar que los campos estén presentes
  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "name"' });
  } else if (!apellido || typeof apellido !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "lastName"' });
  }
  next(); // Los datos son válidos
};

// ========================
// Endpoints Específicos (Siempre antes de los Genéricos)
// ========================

// Endpoint específico: Obtener un usuario por ID
app.get('/users/:id', checkUserIdMiddleware, (req, res) => {
  res.json(req.user); // Responde con los datos del usuario almacenados en `req.user` por el middleware
});

// Endpoint para actualizar un usuario por ID
app.put('/users/:id', checkUserIdMiddleware, validateUser, (req, res) => {
  const { nombre, apellido } = req.body;

  // Actualiza los datos del usuario en la lista de usuarios
  req.user.nombre = nombre;
  req.user.apellido = apellido;

  // Responde con el usuario actualizado
  res.status(200).json({
    message: 'User updated successfully',
    user: req.user,
  });
});

// Endpoint para eliminar un usuario por ID
app.delete('/users/:id', checkUserIdMiddleware, (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  const deleteUser = users.splice(userIndex, 1);

  res.status(200).json({
    message: 'User deleted successfully',
    user: deleteUser[0],
  });
});
// ========================
// Endpoints Genéricos (Después de los Específicos)
// ========================

// Endpoint genérico: Obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users); // Responde con la lista completa de usuarios
});

// Endpoint para crear un nuevo usuario
app.post('/users', validateUser, (req, res) => {
  const { nombre, apellido } = req.body;

  // Crea un nuevo objeto con los datos del usuario
  const newUser = {
    id: Date.now(),
    nombre,
    apellido,
  };

  // Agrega el nuevo usuario a la lista de usuarios
  users.push(newUser);

  // Responde con el nuevo usuario creado
  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Hello World!'); // Responde con un mensaje básico
});

// ========================
// Manejo de Errores
// ========================

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500; // Usa el código de estado del error o 500 por defecto
  res.status(statusCode).json({ error: error.message }); // Responde con el mensaje de error
  console.error(error); // Registra el error en la consola
});

// ========================
// Manejo de Rutas No Encontradas
// ========================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ========================
// Gestión del Servidor
// ========================

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
