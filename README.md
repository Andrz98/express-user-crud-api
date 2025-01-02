# User Management API

## Description

A RESTful API built with **Express.js** to manage users. This application provides full **CRUD** (Create, Read, Update, Delete) functionality for user management. It implements middlewares for validation, error handling, and route organization based on best practices.

---

## Features

- Complete user management:
  - Create a user.
  - Read users (all or specific).
  - Update users.
  - Delete users.
- Reusable middlewares for:
  - Data validation.
  - User ID verification.
- Robust error handling with consistent responses.
- Supports JSON as input/output format.
- Route organization from **most specific** to **most generic**.
- Clean server shutdown handling.

---

## Endpoints

| Method | Route        | Description                              | Response Codes |
| ------ | ------------ | ---------------------------------------- | -------------- |
| GET    | `/users`     | Retrieve the list of all users.          | 200            |
| GET    | `/users/:id` | Retrieve a user by their ID.             | 200, 400, 404  |
| POST   | `/users`     | Create a new user.                       | 201, 400       |
| PUT    | `/users/:id` | Update an existing user by their ID.     | 200, 400, 404  |
| DELETE | `/users/:id` | Delete a user by their ID.               | 200, 400, 404  |
| GET    | `/`          | Returns a basic message ("Hello World"). | 200            |

---

## Requirements

1. **Node.js** (version >= 16)
2. **npm** (version >= 7)

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
