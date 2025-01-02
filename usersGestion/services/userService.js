import users from '../../userMock.js'; // Import the mock user database

// Function to retrieve all users
export const getAllUsers = () => {
  return users; // Simply return the list of users
};

// Function to find a user by ID
export const findUserById = (id) => {
  const userId = parseInt(id); // Convert the ID to an integer
  if (isNaN(userId)) {
    return { error: 'Invalid user ID', status: 400 }; // Return an error if the ID is not a number
  }

  const user = users.find((user) => user.id === userId); // Find the user in the array
  if (!user) {
    return { error: 'User not found', status: 404 }; // Return an error if the user doesn't exist
  }

  return { user }; // Return the user if found
};

// Function to create a new user
export const createUser = (nombre, apellido) => {
  const newUser = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    nombre,
    apellido,
  };

  users.push(newUser); // Add the new user to the array
  return newUser; // Return the newly created user
};

// Function to update a user by ID
export const updateUserById = (user, nombre, apellido) => {
  user.nombre = nombre; // Update the user's name
  user.apellido = apellido; // Update the user's last name
  return user; // Return the updated user
};

// Function to delete a user by ID
export const deleteUserById = (id) => {
  const userIndex = users.findIndex((user) => user.id === parseInt(id)); // Find the user index
  if (userIndex === -1) {
    return { error: 'User not found', status: 404 }; // Return an error if the user doesn't exist
  }

  const deletedUser = users.splice(userIndex, 1); // Remove the user from the array
  return deletedUser[0]; // Return the deleted user
};
