import express from 'express';
import users from './userMock.js'; // Asegúrate de que la ruta y extensión sean correctas

const app = express();
const port = process.env.PORT || 3000; // Usa un puerto dinámico si el 3000 está ocupado

// Middleware para registrar rutas (se ejecuta en todas las solicitudes)
app.use((req, res, next) => {
  console.info(`[INFO] ${req.method} ${req.path}`);
  next(); // Llama a la siguiente fila de middleware en la pila
});

app.use(express.json()); // Permite recibir y procesar datos en formato JSON desde el cliente

// Endpoint principal
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// Endpoint para devolver los usuarios
app.get('/users', (req, res, next) => {
  res.json(users); // Responde con la lista de usuarios
});

app.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const user = user.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }
  res.send(user);
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: error.message,
  });
  console.error(error);
});

// Inicia el servidor
const server = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

// Manejador para liberar el puerto al cerrar el servidor
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
