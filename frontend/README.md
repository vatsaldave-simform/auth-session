# Authentication System Frontend

## Overview

This is a modern React frontend application for an authentication system built with:

- React 19
- TypeScript
- React Router v7
- Tailwind CSS
- Vite

The application demonstrates a secure authentication flow with JWT tokens and HTTP-only cookies for refresh tokens.

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Application configuration
│   ├── constants.ts     # Application constants
│   ├── hooks/           # Custom React hooks
│   ├── hocs/            # Higher-order components
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # Protected pages
│   │   └── public/      # Public pages
│   ├── services/        # API service functions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── Routes.tsx       # Route configuration
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Features

- **Authentication**:
  - User registration
  - User login
  - Token-based authentication
  - Automatic token refresh
  - Protected routes

- **Routing**:
  - Public routes (accessible to all)
  - Auth-only routes (for non-authenticated users)
  - Protected routes (for authenticated users only)

- **User Interface**:
  - Modern, responsive design with Tailwind CSS
  - Loading states
  - Error handling

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
npm install
# or
yarn
```

4. Create a `.env` file in the root directory with the example env

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

## Authentication Flow

This application implements a secure authentication flow:

1. **User Registration/Login**:
   - User provides credentials
   - Backend validates and issues access token and refresh token
   - Access token is stored in localStorage
   - Refresh token is stored in an HTTP-only cookie

2. **Protected Routes Access**:
   - Access token is sent with each request to protected resources
   - If access token expires, refresh token is used to get a new one
   - If refresh token is invalid, user is redirected to login

3. **Logout**:
   - Clears tokens from browser storage
   - Invalidates refresh token on the server

## Key Components

- **Route Protection**:
  - `PublicOnlyRoute` - Only accessible when not logged in
  - `ProtectedRoute` - Only accessible when logged in

- **Authentication Hook**:
  - `useAuthentication` - Manages authentication state

- **API Services**:
  - `auth.services` - Handles authentication API calls
  - `profile.services` - Handles user profile data

## Development Notes

- Tailwind CSS is used for styling
- TypeScript is used for type safety
- API requests use the fetch API wrapped in a utility function
- Error handling is implemented at multiple levels