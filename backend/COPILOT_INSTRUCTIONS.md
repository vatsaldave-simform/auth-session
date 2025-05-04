# COPILOT INSTRUCTIONS FOR NODE-EXPRESS-TYPESCRIPT-PRISMA BACKEND

## PRIME DIRECTIVE

- Avoid working on more than one file at a time to prevent conflicts and corruption
- Maintain clear communication about changes being made
- Explain architecture decisions and best practices while coding
- Follow TypeScript best practices with proper type definitions

## LARGE FILE & COMPLEX CHANGE PROTOCOL

### MANDATORY PLANNING PHASE
When working with large files (>300 lines) or complex changes:
1. ALWAYS start by creating a detailed plan BEFORE making any edits
2. Your plan MUST include:
   - All functions/sections that need modification
   - The order in which changes should be applied
   - Dependencies between changes
   - Estimated number of separate edits required

3. Format your plan as:
```
## PROPOSED EDIT PLAN
Working with: [filename]
Total planned edits: [number]

### Edit sequence:
1. [First specific change] - Purpose: [why]
2. [Second specific change] - Purpose: [why]
3. Do you approve this plan? I'll proceed with Edit [number] after your confirmation.
```

### EXECUTION PHASE
- After each individual edit, clearly indicate progress:
  "✅ Completed edit [#] of [total]. Ready for next edit?"
- If discovering additional needed changes during editing:
  - STOP and update the plan
  - Get approval before continuing

### REFACTORING GUIDANCE
When refactoring large files:
- Break work into logical, independently functional chunks
- Ensure each intermediate state maintains functionality
- Consider temporary duplication as a valid interim step
- Always indicate the refactoring pattern being applied

## TECHNOLOGY STACK SPECIFICATIONS

### Node.js & Express
- **Target Node Version**: 18.x LTS or newer
- **Express.js Patterns**:
  - Use express Router for modular route definitions
  - Implement middleware for cross-cutting concerns
  - Follow RESTful API patterns
  - Use async/await with proper error handling
  - Implement global error handling middleware
  - Apply rate limiting for public endpoints
  - Use helmet.js for security headers

### TypeScript Requirements
- **Target Version**: TypeScript 5.0+
- **Features to Use**:
  - Strict type checking (`"strict": true` in tsconfig)
  - Interfaces for API request/response objects
  - Type guards for runtime checks
  - Utility types (Pick, Omit, Partial, etc.)
  - Generics for reusable components
  - Enum for constants and types with fixed values
  - Discriminated unions for state handling
  - Properly typed error handling
  - Module augmentation when needed
  - Namespaces only when absolutely necessary
- **TypeScript Style**:
  - Use type inference where obvious
  - Explicit return types on exported functions
  - Use readonly modifier when applicable
  - Prefer interfaces for public APIs, types for internal
  - Use consistent naming conventions (PascalCase for types, camelCase for variables)

### Prisma Requirements
- **Best Practices**:
  - Use migrations for database schema changes
  - Define comprehensive data models
  - Use relations with proper cascade behavior
  - Implement middleware for common operations
  - Use transactions for multi-step database operations
  - Apply proper indexing for frequently queried fields
  - Use Prisma's validation and constraint features
  - Implement soft delete patterns when appropriate
  - Ensure foreign key constraints are enforced
- **Query Optimization**:
  - Use select/include to avoid overfetching
  - Implement pagination for large datasets
  - Use findUnique/findFirst for single records
  - Batch operations when possible
  - Use Prisma's interactive transactions for consistency

## PROJECT STRUCTURE

```
backend/
├── src/                     # Application source code
│   ├── config/              # Configuration files
│   │   ├── db.ts            # Database configuration
│   │   ├── env.ts           # Environment variables
│   │   └── logger.ts        # Logging configuration
│   ├── api/                 # API modules
│   │   ├── routes/          # Express routes
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── validators/      # Request validation
│   │   └── index.ts         # API routes setup
│   ├── services/            # Business logic
│   ├── repositories/        # Data access layer
│   ├── models/              # Type definitions/interfaces
│   ├── utils/               # Utility functions
│   │   ├── errors.ts        # Custom error classes
│   │   ├── pagination.ts    # Pagination utilities
│   │   └── validation.ts    # Validation helpers
│   ├── types/               # TypeScript types and interfaces
│   │   ├── express.d.ts     # Express augmentations
│   │   └── environment.d.ts # Environment types
│   ├── app.ts               # Express application setup
│   └── server.ts            # HTTP server initialization
├── prisma/                  # Prisma ORM files
│   ├── schema.prisma        # Prisma data models
│   ├── migrations/          # Prisma migrations
│   └── seed.ts              # Database seed script
├── tests/                   # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   ├── e2e/                 # End-to-end tests
│   └── fixtures/            # Test data
├── dist/                    # Compiled JavaScript files
├── scripts/                 # Helper scripts
│   ├── seed-database.ts     # Seed script
│   └── generate-types.ts    # Type generation
├── logs/                    # Application logs
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   └── architecture/        # Architecture diagrams
├── .env                     # Environment variables (gitignored)
├── .env.example             # Example environment variables
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Jest test configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## CODE ORGANIZATION PRINCIPLES

### Controllers
- Should be thin and focused on:
  - Request validation
  - Calling appropriate services
  - Response formatting
  - Error handling
- Should NOT contain business logic

### Services
- Contain all business logic
- Orchestrate operations involving multiple repositories
- Handle transaction management
- Implement domain validation

### Repositories
- Interact directly with Prisma client
- Handle data access and transformation
- Abstract database-specific logic
- Do NOT contain business rules

### Middleware
- Focus on cross-cutting concerns:
  - Authentication
  - Logging
  - Error handling
  - Request parsing
  - Response transformation

## CODING STANDARDS

### Naming Conventions
- **Files**: Use kebab-case for filenames: `user-service.ts`
- **Classes**: Use PascalCase: `UserService`
- **Interfaces/Types**: Use PascalCase with descriptive names: `UserResponseDto`
- **Functions/Methods**: Use camelCase with verb prefixes: `getUserById`
- **Variables**: Use camelCase with descriptive names: `userProfile`
- **Constants**: Use UPPER_SNAKE_CASE: `MAX_LOGIN_ATTEMPTS`
- **Enums**: Use PascalCase for name, PascalCase for values: `enum UserRole { Admin, User }`
- **Database Models**: Use PascalCase singular: `User` not `Users`

### Code Formatting
- Use Prettier for consistent formatting
- Indent using 2 spaces
- Maximum line length of 100 characters
- Use trailing commas in multi-line objects/arrays
- Use semicolons at the end of statements
- Use single quotes for strings

### Error Handling
- Create custom error classes extending Error
- Always use async/await with try/catch
- Categorize errors (Client, Server, Validation)
- Provide meaningful error messages
- Log errors with appropriate severity
- Don't expose sensitive information in error responses
- Use HTTP status codes correctly

Example error handling structure:
```typescript
try {
  await service.performAction();
} catch (err) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  logger.error('Unexpected error', { error: err });
  return res.status(500).json({ message: 'Internal server error' });
}
```

### Type Definitions
- Define request/response DTOs as interfaces
- Use Zod/Joi/class-validator for runtime validation
- Keep types DRY using composition and generics
- Export types/interfaces for reuse
- Use barrel files (index.ts) to consolidate exports

### Documentation
- Document all public APIs using JSDoc
- Include parameters, return types, and examples
- Add `@throws` annotations for expected errors
- Document environment variables in .env.example
- Add README files in major directories
- Generate API docs using tools like OpenAPI/Swagger

Example JSDoc:
```typescript
/**
 * Creates a new user in the system
 * 
 * @param userData - The user data to create
 * @returns The created user object
 * @throws {ValidationError} If user data is invalid
 * @throws {ConflictError} If email already exists
 */
async function createUser(userData: CreateUserDto): Promise<UserResponseDto> {
  // Implementation
}
```

## SECURITY BEST PRACTICES

- **Authentication**:
  - Use JWT with appropriate expiration times
  - Implement refresh token rotation
  - Store tokens securely (httpOnly, secure cookies)
  - Implement rate limiting for auth endpoints
  - Use secure password hashing (bcrypt, Argon2)

- **Authorization**:
  - Implement role-based access control
  - Use middleware for authorization checks
  - Follow principle of least privilege

- **Data Validation**:
  - Validate all input data before processing
  - Use a schema validation library (Zod/Joi)
  - Implement content type checking

- **Security Headers**:
  - Use Helmet.js to set security headers
  - Implement strict CSP policies
  - Enable CORS with specific origins

- **Data Protection**:
  - Encrypt sensitive data at rest
  - Use HTTPS for all communications
  - Implement proper data sanitization
  - Follow GDPR and other privacy regulations

## PERFORMANCE CONSIDERATIONS

- **Database**:
  - Use proper indexing on frequently queried fields
  - Implement pagination for list endpoints
  - Use database transactions for data consistency
  - Optimize queries to reduce database load

- **Caching**:
  - Use Redis for caching when appropriate
  - Implement ETags for API responses
  - Cache static assets and rarely changing data

- **Application**:
  - Minimize dependencies to reduce bundle size
  - Use compression middleware
  - Implement timeouts for external service calls
  - Use connection pooling for database connections

## TESTING STANDARDS

- **Unit Tests**:
  - Test individual functions/methods in isolation
  - Mock external dependencies
  - Focus on business logic in services

- **Integration Tests**:
  - Test API endpoints with supertest
  - Use test database for data persistence
  - Test happy paths and error scenarios

- **Test Organization**:
  - Mirror source directory structure in tests
  - Use descriptive test names
  - Group related tests with describe blocks
  - Use before/after hooks for setup/teardown

- **Test Patterns**:
  - Arrange-Act-Assert pattern
  - Given-When-Then for behavior tests
  - Use factory functions for test data

Example test structure:
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user when valid data is provided', async () => {
      // Arrange
      const userData = { name: 'Test User', email: 'test@example.com' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
    });
    
    it('should throw ValidationError when invalid data is provided', async () => {
      // Arrange
      const userData = { name: '', email: 'invalid-email' };
      
      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(ValidationError);
    });
  });
});
```

## ENVIRONMENT & CONFIGURATION

- Use dotenv for environment variables
- Create typed environment configuration
- Validate environment on application startup
- Provide sensible defaults for non-critical values
- Use different configurations per environment (dev/test/prod)

Example environment configuration:
```typescript
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  CORS_ORIGIN: z.string().url().or(z.literal('*')).default('*'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

const env = envSchema.parse(process.env);

export default env;
```

## LOGGING STANDARDS

- Use a structured logging library (Winston/Pino)
- Include request IDs for traceability
- Log appropriate levels (debug, info, warn, error)
- Include relevant context with each log
- Avoid logging sensitive information
- Implement log rotation

Example logging setup:
```typescript
import winston from 'winston';
import env from './env';

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
```

## API DESIGN PRINCIPLES

- Follow RESTful conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Implement consistent error responses
- Version your API (v1, v2)
- Use meaningful URL paths based on resources
- Implement proper pagination, filtering, and sorting
- Use query parameters for filtering, URL params for identity
- Return appropriate HTTP status codes

API Response Format:
```typescript
// Success response
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
  }
}

// Error response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

## DEPENDENCY MANAGEMENT

- Keep dependencies up-to-date
- Use semantic versioning in package.json
- Audit dependencies regularly for security vulnerabilities
- Minimize production dependencies
- Prefer stable, well-maintained packages

## DEPLOYMENT CONSIDERATIONS

- Use Docker for containerization
- Implement health check endpoints
- Configure graceful shutdown
- Set up proper monitoring and alerting
- Use CI/CD for automated testing and deployment
- Implement database migration strategy
- Use environment-specific configurations

## DOCUMENTATION AND KNOWLEDGE SHARING

- Maintain up-to-date README
- Document API endpoints using OpenAPI/Swagger
- Create architecture diagrams
- Keep codebase self-documented with good practices
- Include setup instructions for new developers