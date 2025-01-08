# User Management API

This is a simple Node.js and Express application that allows users to manage user data via a RESTful API. It supports basic CRUD operations (Create, Read, Update, Delete) using MongoDB for data storage.

## Features

- **User Registration**: Allows users to register with a username, email, and password.
- **Login**: Enables users to log in with their email and password.
- **Password Encryption**: Ensures user passwords are securely stored using Argon2 for encryption.
- **Unique Username and Email Restriction**: Prevents duplicate entries for username and email.
- **Create a User**: Allows you to create a new user.
- **Get All Users**: Fetches the list of all users.
- **Get User by ID**: Fetches a specific user by their ID.
- **MongoDB Integration**: Uses MongoDB for storing user data.

## Technologies Used

- **Node.js**: JavaScript runtime to build the server.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **argon2**: Library used for encrypting passwords securely.
