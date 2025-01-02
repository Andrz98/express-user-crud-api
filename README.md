# User Management API

## **Description**

A modular RESTful API built with **Express.js** to manage users. This application provides full **CRUD** (Create, Read, Update, Delete) functionality, following best practices for project organization, reusability, and scalability.

---

## **Features**

- **Modular Structure**: Separation of concerns for middlewares, controllers, and routes.
- **CRUD Functionality**:
  - Create a new user.
  - Retrieve all users or a specific user by ID.
  - Update user data by ID.
  - Delete a user by ID.
- **Reusable Middlewares**:
  - Validate user IDs.
  - Validate user data for creation and updates.
- **Error Handling**:
  - Global error-handling middleware.
  - 404 handling for undefined routes.
- **Graceful Shutdown**:
  - Cleanly handles `SIGINT` and `SIGTERM` signals.
- **Mock Database**:
  - Simulated user data with a `userMock.js` file for testing.

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
├── middlewares/         # Contains all middleware functions
│   ├── checkUserId.js   # Middleware for validating user ID
│   └── validateUser.js  # Middleware for validating user data
├── controllers/         # Contains the logic for each route
│   └── userController.js # Controllers for user-related routes
├── routes/              # Contains route definitions
│   └── userRoutes.js    # Routes related to users
├── userMock.js          # Simulated database for testing
├── app.js               # Main entry point for the application
├── package.json         # Project dependencies and configuration
└── README.md            # Project documentation

---

## **Licence**

```

This project is licensed under the MIT License. See the LICENSE file for details.
