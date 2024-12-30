import express from 'express';
const app = express();

const port = 3000;

// Middleware para registrar rutas (se ejecuta en todas las solicitudes)

app.use((req, res, next) => {
  console.info(`[INFO] ${req.method} ${req.path}`);
  next(); // llamo a la siguiente fila de middleware en la pila
});

app.use(express.json()); //permite recibir y procesar datos en formato JSON desde el cliente

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
