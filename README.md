# Authenctication System

## Overview

This project is a Authenctication System built using NestJS, a progressive Node.js framework, and Prisma, an ORM for database management. The system includes a robust authentication mechanism to ensure secure access to the application.

## Features

- User Registration and Login
- JWT-based Authentication
- Database Management with Prisma

## Technologies Used

- **NestJS**: A framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: An ORM for database management, providing a type-safe API for interacting with the database.
- **PostgreSQL**: The database used for storing user and project data.
- **TypeScript**: The primary language for development, providing type safety and modern JavaScript features.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/project-management.git
    cd project-management
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    NODE_ENV='development'

    APPLICATION_PORT=4000
    APPLICATION_URL='http://localhost:${APPLICATION_PORT}'
    GRAPHQL_PREFIX='/graphql'
    ALLOWED_ORIGIN='http://localhost:3000'

    COOKIES_SECRET=your_secret__key
    SESSION_SECRET=your_secret__key
    SESSION_NAME='session'
    SESSION_DOMAIN='localhost'
    SESSION_MAX_AGE='30d'
    SESSION_HTTP_ONLY=true
    SESSION_SECURE=false
    SESSION_FOLDER='sessions:'

    POSTGRES_USER=your_postgres_name
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_HOST='localhost' 
    POSTGRES_PORT='5433'   
    POSTGRES_DATABASE=your_database_name

    POSTGRES_URI='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public'

    REDIS_USER=your_redis_name
    REDIS_PASSWORD=your_redis_password
    REDIS_HOST='localhost' 
    REDIS_PORT='6379'

    REDIS_URI='redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}'

    MAIL_HOST=your_email_host
    MAIL_PORT=your_email_port
    MAIL_LOGIN=your_email_login
    MAIL_PASSWORD=your_email_password
    ```

4. Run the Prisma set up the database schema:
    ```sh
    npx prisma db push
    ```

5. Start the development server:
    ```sh
    npm run start:dev
    ```

## Usage

# GraphQL API Schema Explanation

This document provides an overview of the GraphQL API schema based on the provided image. It includes the queries, mutations, models, and input types used in the API.

## Queries
Queries allow fetching data from the server. The following queries are available:

- **findCurrentSession**: Retrieves the current session of the logged-in user.
- **findProfile**: Returns the profile details of the authenticated user.
- **findSessionsByUser**: Returns a list of active sessions for a given user.
- **generateTotpSecret**: Generates a secret key for enabling TOTP (Time-based One-Time Password).

## Mutations
Mutations are used to modify data. Below are the available mutations:

- **clearSessionCookie**: Clears the current session cookie.
- **createUser(data: CreateUserInput!)**: Registers a new user.
- **deactivateAccount(data: DeactivateAccountInput!)**: Deactivates an account.
- **disableTotp**: Disables Two-Factor Authentication (TOTP).
- **enableTotp(data: EnableTotpInput!)**: Enables TOTP authentication.
- **loginUser(data: LoginInput!)**: Logs in a user and returns authentication details.
- **logoutUser**: Logs out the current user.
- **newPassword(data: NewPasswordInput!)**: Sets a new password.
- **passwordChange(data: PasswordChangeInput!)**: Changes an existing password.
- **removeSession(id: String!)**: Removes an active session.
- **resetPassword(data: ResetPasswordInput!)**: Sends a password reset request.
- **verifyAccount(data: VerificationInput!)**: Verifies a user's account.

## Models
The following models represent data structures used in queries and mutations:

### **SessionModel**
Represents a user session.
```graphql
type SessionModel {
  createdAt: String!
  id: ID!
  metadata: SessionMetadataModel!
  userId: String!
}
```

### **UserModel**
Represents a user profile.
```graphql
type UserModel {
  avatar: String
  bio: String
  createdAt: DateTime!
  deactivateAt: DateTime
  displayName: String!
  email: String!
  id: ID!
  isDeactivated: Boolean!
  isEmailVerified: Boolean!
  isTotpEnabled: Boolean!
  isVerified: Boolean!
  updatedAt: DateTime!
  username: String!
}
```

### **AuthModel**
Represents authentication details returned after login.
```graphql
type AuthModel {
  message: String
  user: UserModel
}
```

### **DeviceModel**
Represents a user's device information.
```graphql
type DeviceModel {
  browser: String!
  os: String!
  type: String!
}
```

### **LocationModel**
Stores location details associated with a session.
```graphql
type LocationModel {
  city: String!
  country: String!
  latitude: Float!
  longitude: Float!
}
```

### **TotpModel**
Handles Two-Factor Authentication secrets.
```graphql
type TotpModel {
  qrcodeUrl: String!
  secret: String!
}
```

### **PasswordChangeModel**
Handles password change responses.
```graphql
type PasswordChangeModel {
  message: String
  status: Boolean
}
```

## Input Types
Input types define structured data sent in mutations.

### **CreateUserInput**
```graphql
input CreateUserInput {
  email: String!
  password: String!
  username: String!
}
```

### **LoginInput**
```graphql
input LoginInput {
  login: String!
  password: String!
  pin: String
}
```

### **DeactivateAccountInput**
```graphql
input DeactivateAccountInput {
  email: String!
  password: String!
  pin: String
}
```

### **EnableTotpInput**
```graphql
input EnableTotpInput {
  pin: String!
  secret: String!
}
```

### **NewPasswordInput**
```graphql
input NewPasswordInput {
  password: String!
  passwordRepeat: String!
  token: String!
}
```

### **PasswordChangeInput**
```graphql
input PasswordChangeInput {
  currentPassword: String!
  password: String!
  passwordRepeat: String!
  pin: String
}
```

### **ResetPasswordInput**
```graphql
input ResetPasswordInput {
  email: String!
}
```

### **VerificationInput**
```graphql
input VerificationInput {
  token: String!
}
```

## Conclusion
This document provides an overview of the GraphQL schema used in the project, detailing queries, mutations, models, and input types. The schema enables user authentication, session management, account verification, and security features like Two-Factor Authentication (TOTP).

## License

This project is licensed under the MIT License. See the LICENSE file for details.
