# Authentication Backend Service

## Overview
This is a robust authentication service built with Node.js, Express, and TypeScript. It provides secure user authentication functionality with session management capabilities.

## Project Structure

```
backend/
├── logs/                  # Application logs
│   ├── combined.log       # All logs
│   └── error.log          # Error logs only
├── prisma/                # Database ORM
│   └── schema.prisma      # Database schema definition
├── src/
│   ├── api/               # API layer
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API route definitions
│   │   └── validators/    # Request validation
│   ├── config/            # Application configuration
│   ├── services/          # Business logic layer
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── app.ts             # Express application setup
│   └── server.ts          # Server entry point
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Key Features

- **Authentication**: Complete user authentication system with signup, login, and logout functionality
- **Session Management**: User session handling with refresh token support
- **Validation**: Request validation middleware
- **Error Handling**: Centralized error handling
- **Logging**: Comprehensive logging system
- **Database**: Prisma ORM for database operations

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB database (or any database supported by Prisma)

## API Endpoints

### Authentication

#### Public Routes
- `POST /api/auth/register` - User registration (requires validation with registerSchema)
- `POST /api/auth/login` - User login (requires validation with loginSchema)
- `POST /api/auth/refresh-token` - Refresh authentication token (requires validation with refreshTokenSchema)

#### Protected Routes (require authentication)
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile information

## Development

### Project Structure Explained

- **Controllers**: Handle incoming requests and return responses
- **Services**: Contain business logic and database operations
- **Middlewares**: Process requests before they reach controllers
  - `validation.middleware.ts`: Validates request data against schemas
  - `auth.middleware.ts`: Handles authentication for protected routes
- **Routes**: Define API endpoints and connect them to controllers
- **Validators**: Validate request data with schemas for registration, login, etc.
- **Utils**: Utility functions used across the application

### Logging

The application uses a custom logging utility that writes logs to both console and files:
- `combined.log`: Contains all log levels
- `error.log`: Contains only error logs

### Error Handling

The application has a centralized error handling mechanism in `utils/errors.ts` that standardizes error responses.
