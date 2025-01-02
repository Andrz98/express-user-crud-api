import {
  createUser,
  deleteUserById,
  findUserById,
  getAllUsers,
  updateUserById,
} from '../services/userService.js'; // Import user services

// Controller to get all users
export const getAllUsersController = (req, res) => {
  const users = getAllUsers(); // Use the service to get all users
  res.json(users); // Respond with the user list
};

// Controller to get a user by ID
export const getUserByIdController = (req, res) => {
  const { id } = req.params; // Extract ID from the request
  const result = findUserById(id); // Use the service to find the user

  if (result.error) {
    return res.status(result.status).json({ error: result.error }); // Respond with the error
  }

  res.json(result.user); // Respond with the found user
};

// Controller to create a new user
export const createUserController = (req, res) => {
  const { nombre, apellido } = req.body; // Extract user data from the request body
  const newUser = createUser(nombre, apellido); // Use the service to create the user

  res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
};

// Controller to update a user by ID
export const updateUserController = (req, res) => {
  const { nombre, apellido } = req.body; // Extract updated data from the request body
  const updatedUser = updateUserById(req.user, nombre, apellido); // Use the service to update the user

  res.status(200).json({
    message: 'User updated successfully',
    user: updatedUser,
  });
};

// Controller to delete a user by ID
export const deleteUserController = (req, res) => {
  const { id } = req.params; // Extract ID from the request
  const result = deleteUserById(id); // Use the service to delete the user

  if (result.error) {
    return res.status(result.status).json({ error: result.error }); // Respond with the error
  }

  res.status(200).json({
    message: 'User deleted successfully',
    user: result,
  });
};
