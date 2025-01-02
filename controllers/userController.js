import users from '../userMock.js'; // Import the mock user database

// Controller to get all users
export const getAllUsers = (req, res) => {
  res.json(users); // Respond with the entire user list
};

// Controller to get a single user by ID
export const getUserById = (req, res) => {
  res.json(req.user); // Respond with the user object attached by the middleware
};

// Controller to create a new user
export const createUser = (req, res) => {
  const { nombre, apellido } = req.body; // Extract user data from the request body

  // Create a new user object with a unique ID
  const newUser = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    nombre,
    apellido,
  };

  users.push(newUser); // Add the new user to the users array

  // Respond with a success message and the new user's data
  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
};

// Controller to update an existing user
export const updateUser = (req, res) => {
  const { nombre, apellido } = req.body; // Extract updated user data from the request body

  // Update the user object in the database
  req.user.nombre = nombre;
  req.user.apellido = apellido;

  // Respond with a success message and the updated user's data
  res.status(200).json({
    message: 'User updated successfully',
    user: req.user,
  });
};

// Controller to delete a user by ID
export const deleteUser = (req, res) => {
  const { id } = req.params; // Extract the user ID from the request URL

  // Find the index of the user in the users array
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  // Remove the user from the array and store the deleted user
  const deletedUser = users.splice(userIndex, 1);

  // Respond with a success message and the deleted user's data
  res.status(200).json({
    message: 'User deleted successfully',
    user: deletedUser[0],
  });
};
