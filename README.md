# Node.js Authentication API

A robust Node.js authentication API with local and Google OAuth authentication.

## Features

- User registration and login
- Google OAuth 2.0 authentication
- JWT token-based authentication
- MongoDB database integration
- Swagger API documentation
- Secure password hashing
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Cloud Platform account (for OAuth)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd nodejs-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm start
```

## API Documentation

Once the server is running, visit:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication

- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login with email and password
- GET `/auth/google` - Google OAuth login
- GET `/auth/google/callback` - Google OAuth callback

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Environment variables for sensitive data
- Input validation
- Error handling

## License

MIT
