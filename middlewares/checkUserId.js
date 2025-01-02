import users from '../userMock.js'; // Import the mock user database

// Middleware to validate and find a user by ID
const checkUserIdMiddleware = (req, res, next) => {
  const { id } = req.params; // Extract the `id` parameter from the request URL
  const userId = parseInt(id); // Convert the `id` to an integer for validation

  // Check if the ID is not a valid number
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' }); // Respond with 400 if invalid
  }

  // Find the user in the mock database
  const user = users.find((user) => user.id === userId);

  // If no user is found, return a 404 error
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Attach the found user to the request object for future use
  req.user = user;
  next(); // Proceed to the next middleware or route handler
};

export default checkUserIdMiddleware; // Export the middleware
