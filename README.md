# Node.js CRUD Application

## Overview

This is a Node.js CRUD application that allows users to register, log in, and manage books associated with their accounts. Each user can only access and manage their own books.

## Features

- User registration and authentication using JWT.
- Create, Read, Update, and Delete (CRUD) operations for managing books.
- MongoDB database for storing user and book data.
- Middleware for validation and authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt for password hashing
- jsonwebtoken for JWT authentication
- dotenv for environment variable management
- express-validator for request validation

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed or access to a MongoDB instance.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aramdhann/crud_JWT_nodejs.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd crud_JWT_nodejs
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add your environment variables:**

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/crud
   SECRET_ACCESS_TOKEN=your_secret_key
   ```

### Running the Application

1. **Start the application:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your browser and go to `http://localhost:3000`.

### API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in an existing user and receive a JWT.
- **GET /profile**: Get user profile (requires authentication).
- **POST /books**: Create a new book (requires authentication).
- **GET /books**: Retrieve all books for the logged-in user (requires authentication).
- **PUT /books/:id**: Update a book by ID (requires authentication).
- **DELETE /books/:id**: Delete a book by ID (requires authentication).

## Testing with Postman

You can use Postman to test the API endpoints. Make sure to set the `Authorization` header with the JWT token you receive after logging in.

## Docker Support

To build and run the application using Docker, you can follow these steps:

1. **Build the Docker image:**

   ```bash
   docker build -t my-node-app .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -d -p 3000:3000 --name my-node-app -e MONGO_URI=mongodb://<host>:<port>/crud -e SECRET_ACCESS_TOKEN=<your_secret_key> my-node-app
   ```

## Contributing

Feel free to fork the repository and submit pull requests. Any contributions are welcome!

## Author

Moch. Raditya Aulya Aramdhan
