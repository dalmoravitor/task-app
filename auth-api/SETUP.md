# DoItNow Authentication API - Setup Guide

## 🚀 Complete Authentication API Setup

I've created a complete authentication API for your DoItNow project! Here's what has been implemented:

### ✅ Features Implemented

1. **Complete User Authentication System**
   - User registration with email validation
   - Secure login with JWT tokens
   - Password hashing with bcrypt (12 salt rounds)
   - Token-based authentication middleware

2. **User Profile Management**
   - Get current user profile
   - Update user profile (name, avatar)
   - Change password functionality
   - Account status management

3. **Security Features**
   - JWT token authentication (7-day expiration)
   - Input validation and sanitization
   - Secure error handling
   - CORS support for frontend integration

4. **Professional Code Structure**
   - Modular route organization
   - Middleware separation
   - Utility functions
   - Comprehensive error handling
   - Detailed API documentation

### 📁 Project Structure

```
auth-api/
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   └── validation.js    # Input validation middleware
├── routes/
│   └── auth.js          # All authentication routes
├── utils/
│   └── auth.js          # Helper functions (hashing, tokens, etc.)
├── prisma/
│   └── schema.prisma    # Updated database schema
├── .env                 # Environment variables
├── server.js           # Main server file
├── package.json        # Updated with all scripts
└── README.md           # Complete API documentation
```

### 🛠 Setup Instructions

1. **Start your PostgreSQL database**
   - Make sure your Prisma Postgres server is running
   - The connection string in `.env` should work with your setup

2. **Generate Prisma client and push schema**
   ```bash
   cd auth-api
   npx prisma generate
   npx prisma db push
   ```

3. **Install dependencies (if needed)**
   ```bash
   npm install
   ```

4. **Start the API server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Or production mode
   npm start
   ```

### 🔗 API Endpoints

The API will be available at `http://localhost:3001` with these endpoints:

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile
- `PUT /auth/profile` - Update user profile
- `PUT /auth/change-password` - Change password
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user

#### Health Check
- `GET /` - API status
- `GET /health` - Health check

### 📱 Frontend Integration

To integrate with your React Native app, you'll need to:

1. **Install HTTP client** (if not already installed)
   ```bash
   npm install axios
   # or use fetch (built-in)
   ```

2. **Create authentication service**
   ```javascript
   // services/authService.js
   const API_BASE_URL = 'http://localhost:3001';

   export const authService = {
     register: async (userData) => {
       const response = await fetch(`${API_BASE_URL}/auth/register`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(userData),
       });
       return response.json();
     },

     login: async (email, password) => {
       const response = await fetch(`${API_BASE_URL}/auth/login`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password }),
       });
       return response.json();
     },

     getCurrentUser: async (token) => {
       const response = await fetch(`${API_BASE_URL}/auth/me`, {
         headers: { 'Authorization': `Bearer ${token}` },
       });
       return response.json();
     }
   };
   ```

3. **Store tokens securely**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

### 🔐 Security Features

- **Password Security**: Bcrypt hashing with 12 salt rounds
- **JWT Tokens**: 7-day expiration with secure secret
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Secure error messages without data leakage
- **CORS**: Configurable for your frontend domain

### 📊 Database Schema

Updated PostgreSQL schema with:
- User ID (auto-increment)
- Email (unique)
- Hashed password
- Name (optional)
- Avatar URL (optional)
- Account status
- Timestamps (created/updated)

### 🧪 Testing the API

You can test the API using:

1. **Postman/Insomnia** - Import the endpoints from the README
2. **cURL commands**:
   ```bash
   # Register user
   curl -X POST http://localhost:3001/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

   # Login
   curl -X POST http://localhost:3001/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

### 🚀 Next Steps

1. **Start the database** and push the schema
2. **Test the API** endpoints
3. **Integrate with your React Native frontend**
4. **Add your app's business logic endpoints** (tasks, projects, etc.)

The authentication foundation is complete and ready for production use! The API includes comprehensive error handling, validation, and security best practices.

Would you like me to help you integrate this with your React Native frontend or add any additional features?
