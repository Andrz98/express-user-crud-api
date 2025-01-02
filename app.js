import express from 'express'; // Import Express.js
import userRoutes from './routes/userRoutes.js'; // Import user routes

const app = express(); // Initialize the Express application
const port = process.env.PORT || 3000; // Set the server port (default: 3000)

// Global middleware to parse JSON bodies
app.use(express.json()); // Ensures that incoming JSON data is parsed

// Log all incoming requests for debugging purposes
app.use((req, res, next) => {
  console.info(`[INFO] ${req.method} ${req.path}`); // Log the HTTP method and route path
  next(); // Proceed to the next middleware or route handler
});

// Mount user-related routes at the `/users` path
app.use('/users', userRoutes); // Routes for managing users

// Global error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500; // Default to 500 if no status code is provided
  res.status(statusCode).json({ error: error.message }); // Respond with the error message and status code
  console.error(error); // Log the error details for debugging
});

// Middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' }); // Respond with a 404 error for unknown routes
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Log the server URL
});

// Gracefully handle server shutdown
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
