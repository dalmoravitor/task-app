# DoItNow Auth API

A complete authentication API built with Express.js, Prisma, and PostgreSQL for the DoItNow task management application.

## Features

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Profile management
- ✅ Password change functionality
- ✅ Token refresh
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository and navigate to the auth-api folder**
   ```bash
   cd auth-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` and update the values:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

## Running the API

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/` - API status
- **GET** `/health` - Health check

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe" // optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "avatar": null,
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "token": "jwt-token-here"
    }
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "avatar": null,
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "token": "jwt-token-here"
    }
  }
  ```

#### Get Current User
- **GET** `/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe",
        "avatar": null,
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      }
    }
  }
  ```

#### Update Profile
- **PUT** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "avatar": "https://example.com/avatar.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "Jane Doe",
        "avatar": "https://example.com/avatar.jpg",
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:01.000Z"
      }
    }
  }
  ```

#### Change Password
- **PUT** `/auth/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```

#### Refresh Token
- **POST** `/auth/refresh`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Token refreshed successfully",
    "data": {
      "token": "new-jwt-token-here"
    }
  }
  ```

#### Logout
- **POST** `/auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": ["Specific validation errors"] // only for validation errors
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or token)
- `403` - Forbidden (expired token)
- `404` - Not Found
- `409` - Conflict (user already exists)
- `500` - Internal Server Error

## Validation Rules

### Registration
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Name: Optional, max 50 characters

### Login
- Email: Required, valid email format
- Password: Required

### Profile Update
- Name: Optional, max 50 characters, non-empty if provided
- Avatar: Optional, max 500 characters (URL)

### Change Password
- Current Password: Required
- New Password: Required, minimum 6 characters, different from current

## Security Features

- Passwords are hashed using bcrypt with 12 salt rounds
- JWT tokens expire after 7 days
- Input validation and sanitization
- CORS protection
- Rate limiting friendly structure
- Secure error messages (no sensitive data exposure)

## Database Schema

```sql
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## Folder Structure

```
auth-api/
├── middleware/
│   ├── auth.js          # Authentication middleware
│   └── validation.js    # Input validation middleware
├── routes/
│   └── auth.js          # Authentication routes
├── utils/
│   └── auth.js          # Authentication utilities
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── server.js           # Main server file
└── README.md           # This file
```

## Integration with Frontend

To use this API in your React Native frontend:

1. Install axios or fetch for HTTP requests
2. Store the JWT token in secure storage (AsyncStorage, SecureStore)
3. Include the token in the Authorization header for protected routes
4. Handle token refresh and logout scenarios

Example frontend integration:

```javascript
// Login function
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token securely
      await AsyncStorage.setItem('token', data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Authenticated request function
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
```

## License

This project is licensed under the ISC License.
