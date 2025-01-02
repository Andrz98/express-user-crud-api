import express from 'express'; // Import Express.js
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js'; // Import all user controllers
import checkUserIdMiddleware from '../middlewares/checkUserId.js'; // Import the ID validation middleware
import validateUser from '../middlewares/validateUser.js'; // Import the data validation middleware

const router = express.Router(); // Create a router instance

// Route to get all users
router.get('/', getAllUsers); // GET /users

// Route to get a single user by ID
router.get('/:id', checkUserIdMiddleware, getUserById); // GET /users/:id

// Route to create a new user
router.post('/', validateUser, createUser); // POST /users

// Route to update a user by ID
router.put('/:id', checkUserIdMiddleware, validateUser, updateUser); // PUT /users/:id

// Route to delete a user by ID
router.delete('/:id', checkUserIdMiddleware, deleteUser); // DELETE /users/:id

export default router; // Export the router
