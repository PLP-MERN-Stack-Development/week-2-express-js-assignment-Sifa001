# Express.js Products API

A RESTful API built with Express.js for managing products with full CRUD operations, middleware implementation, and error handling.

##  Features

- **RESTful API Design**: Standard HTTP methods and status codes
- **CRUD Operations**: Create, Read, Update, Delete products
- **MongoDB Integration**: Persistent data storage with Mongoose
- **Input Validation**: Schema validation with custom error messages
- **Query Filtering**: Filter products by category, stock status, and price range
- **Error Handling**: Comprehensive error responses with appropriate status codes
- **Middleware Support**: Logging, authentication, and validation middleware

##  Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd express-products-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/products-api
API_KEY=your-secret-api-key
```

5. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🔧 Required Dependencies

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "body-parser": "^1.20.0",
  "uuid": "^9.0.0",
  "dotenv": "^16.0.0"
}
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All API endpoints require an API key in the request headers:
```
X-API-Key: your-secret-api-key
```

### Endpoints

#### 1. Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (optional): Filter by category (Electronics, Clothing, Home, Books, Other)
- `inStock` (optional): Filter by stock status (true/false)
- `minPrice` (optional): Filter by minimum price
- `maxPrice` (optional): Filter by maximum price

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/products?category=Electronics&inStock=true" \
  -H "X-API-Key: your-secret-api-key"
```

**Example Response:**
```json
[
  {
    "_id": "64f8b2c4d1e5f2a3b4c5d6e7",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "Electronics",
    "inStock": true,
    "formattedPrice": "$1200.00",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

#### 2. Get Product by ID
```http
GET /api/products/:id
```

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/products/64f8b2c4d1e5f2a3b4c5d6e7" \
  -H "X-API-Key: your-secret-api-key"
```

#### 3. Create New Product
```http
POST /api/products
```

**Request Body:**
```json
{
  "name": "Smartphone",
  "description": "Latest model with 128GB storage",
  "price": 800,
  "category": "Electronics",
  "inStock": true
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "Electronics",
    "inStock": true
  }'
```

#### 4. Update Product
```http
PUT /api/products/:id
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 900,
  "category": "Electronics",
  "inStock": false
}
```

**Example Request:**
```bash
curl -X PUT "http://localhost:3000/api/products/64f8b2c4d1e5f2a3b4c5d6e7" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key" \
  -d '{
    "name": "Updated Laptop",
    "price": 1100
  }'
```

#### 5. Delete Product
```http
DELETE /api/products/:id
```

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/products/64f8b2c4d1e5f2a3b4c5d6e7" \
  -H "X-API-Key: your-secret-api-key"
```

**Success Response:**
```json
{
  "message": "Product deleted successfully"
}
```

##  Product Schema

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Max 100 characters |
| description | String | Yes | Max 500 characters |
| price | Number | Yes | Min: 0, Max: 1,000,000 |
| category | String | Yes | Must be one of: Electronics, Clothing, Home, Books, Other |
| inStock | Boolean | No | Default: true |

## Error Responses

The API returns appropriate HTTP status codes and error messages:

### 400 Bad Request
```json
{
  "message": "Product name is required"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 401 Unauthorized
```json
{
  "message": "API key is required"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

##  Testing

You can test the API using various tools:

### Using curl
```bash
# Test the root endpoint
curl http://localhost:3000/

# Test getting all products
curl -H "X-API-Key: your-secret-api-key" http://localhost:3000/api/products
```

### Using Postman
1. Import the provided Postman collection (if available)
2. Set the base URL to `http://localhost:3000`
3. Add the API key header to your requests


## Project Structure

```
express-products-api/
├── models/
│   └── Product.js          # Mongoose product model
├── routes/
│   └── productRoutes.js    # Product API routes
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── logger.js           # Request logging middleware
│   └── errorHandler.js     # Error handling middleware
├── server.js               # Main server file
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
└── README.md              # This file
```

##  Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/products-api

# Authentication
API_KEY=your-secret-api-key-here

# Environment
NODE_ENV=development
```

##  Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the error messages in the console
2. Verify your environment variables are set correctly
3. Ensure MongoDB is running
4. Check that all dependencies are installed

For additional help, please open an issue in the GitHub repository.