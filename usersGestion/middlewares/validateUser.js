// Middleware to validate user data for creation or update
const validateUser = (req, res, next) => {
  const { nombre, apellido } = req.body; // Extract the required fields from the request body

  // Validate that `nombre` is present and is a string
  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "name"' });
  }

  // Validate that `apellido` is present and is a string
  if (!apellido || typeof apellido !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing "lastName"' });
  }

  next(); // If validation passes, proceed to the next middleware or handler
};

export default validateUser; // Export the middleware
