# User Management API

## **Description**

A modular RESTful API built with **Express.js** to manage users. This application provides full **CRUD** (Create, Read, Update, Delete) functionality, following best practices for project organization, reusability, and scalability.

---

## **Features**

- **CRUD Functionality**:
  - Create a user.
  - Retrieve all users or a specific user by ID.
  - Update user data by ID.
  - Delete a user by ID.
- **Modular Structure**:
  - Organized into separate folders for middlewares, controllers, routes, and services.
- **Mock Database**:
  - Uses a `userMock.js` file for simulating user data.
- **Error Handling**:
  - Global error handler and 404 response for undefined routes.
- **Graceful Shutdown**:
  - Handles `SIGINT` and `SIGTERM` signals for a clean server shutdown.

---

## **Endpoints**

| Method | Route        | Description                              | Response Codes |
| ------ | ------------ | ---------------------------------------- | -------------- |
| GET    | `/users`     | Retrieve the list of all users.          | 200            |
| GET    | `/users/:id` | Retrieve a user by their ID.             | 200, 400, 404  |
| POST   | `/users`     | Create a new user.                       | 201, 400       |
| PUT    | `/users/:id` | Update an existing user by their ID.     | 200, 400, 404  |
| DELETE | `/users/:id` | Delete a user by their ID.               | 200, 400, 404  |
| GET    | `/`          | Returns a basic message ("Hello World"). | 200            |

---

## **Project Structure**

```plaintext
.
├── usersGestion/            # Parent folder for user-related logic
│   ├── middlewares/         # Middlewares for user management
│   │   ├── checkUserId.js   # Middleware for validating user ID
│   │   └── validateUser.js  # Middleware for validating user data
│   ├── controllers/         # Logic for user-related endpoints
│   │   └── userController.js # Controllers for users
│   ├── routes/              # User-related routes
│   │   └── userRoutes.js    # Defines user endpoints
│   └── services/            # Services for handling business logic
│       └── userService.js   # Core service functions for users
├── userMock.js              # Simulated database for testing
├── app.js                   # Main application entry point
├── package.json             # Project dependencies and configuration
└── README.md                # Documentation for the project

---

## **Licence**

```

This project is licensed under the MIT License. See the LICENSE file for details.
