# Authentication Middleware

This repository contains a middleware for handling user authentication. It provides functionality to register users and login with JWT (JSON Web Tokens) for secure authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with email and password.
- User login with email and password.
- Secure authentication using JWT tokens.
- MongoDB integration for user data storage.

## Prerequisites

Before installing and running this middleware, ensure that you have the following prerequisites:

- Node.js (v12 or higher)
- MongoDB

## Installation

To get started with the authentication middleware, follow these steps:

1. Clone this repository to your local machine.

```shell
git clone https://github.com/rahuldahal/auth.git
```

2. Install the dependencies by navigating to the cloned repository directory and running the following command:

```shell
cd auth
npm install
```

3. Set up the environment variables. Create a `.env` file in the root directory and provide the necessary values for the following variables:

```
MONGODB_URI=<your-mongodb-connection-uri>
JWT_SECRET=<your-secret-key>
```

4. Start the middleware by running the following command:

```shell
npm start
```

The middleware should now be up and running on the specified port (default: 3000) and connected to the MongoDB database.

## Usage

The authentication middleware provides registration and login endpoints for user authentication using JWT tokens. See the [API Endpoints](#api-endpoints) section for more details.

## API Endpoints

The following API endpoints are available for user authentication:

### Register a new user

- **Endpoint:** `/register`
- **Method:** POST
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secretpassword",
  "passwordConfirmation": "secretpassword"
}
```

- **Response:**

```
HTTP Status Code: 201 Created
JWT Access Token: your-generated-jwt-token-with-payload
```

### Login

- **Endpoint:** `/login`
- **Method:** POST
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

- **Response:**

```
HTTP Status Code: 200 OK
JWT Access Token: your-generated-jwt-token-with-payload
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
