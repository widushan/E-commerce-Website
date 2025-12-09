# Trendzide E-Commerce Application - Complete Interview Guide

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Features & Functionality](#core-features--functionality)
6. [Data Models](#data-models)
7. [Key Workflows](#key-workflows)
8. [Backend Components](#backend-components)
9. [Frontend Components](#frontend-components)
10. [Admin Panel](#admin-panel)
11. [Authentication & Security](#authentication--security)
12. [Payment Integration](#payment-integration)
13. [Deployment](#deployment)

---

## Application Overview

**Trendzide** is a modern, full-stack e-commerce platform built for fashion and lifestyle products. It's a three-tier application consisting of:
- **Frontend**: Customer-facing React application
- **Admin Panel**: Separate React dashboard for product/order management
- **Backend**: Node.js/Express REST API with MongoDB

The application handles the complete e-commerce workflow: browsing products, shopping cart management, order placement, payment processing, and admin operations.

---

## Architecture

```
┌─────────────────────┐
│   Admin Panel       │
│   (React + Vite)    │
└──────────┬──────────┘
           │
           │ HTTP/REST
           ▼
┌─────────────────────────────────────────┐
│       Backend API (Express)              │
│  ├─ User Routes                         │
│  ├─ Product Routes                      │
│  ├─ Cart Routes                         │
│  └─ Order Routes                        │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┬──────────┐
      ▼                       ▼          ▼
  ┌────────────┐      ┌────────────┐  ┌──────────┐
  │  MongoDB   │      │ Cloudinary │  │Razorpay/ │
  │ Database   │      │   (Images) │  │ Stripe   │
  └────────────┘      └────────────┘  └──────────┘
      ▲
      │ HTTP/REST
┌─────┴──────────┐
│  Frontend App  │
│ (React + Vite) │
└────────────────┘
```

### Architecture Explanation:
- **Three-Tier Model**: Presentation (React), Business Logic (Express), and Data (MongoDB)
- **Separation of Concerns**: Admin and Frontend are separate SPAs consuming the same API
- **Microservices-like**: Each route (user, product, cart, order) handles specific business domains
- **Cloud Integration**: Cloudinary for image storage, payment gateways for transactions

---

## Technology Stack

### Frontend & Admin Panel
```json
{
  "Framework": "React 19.1.0",
  "Build Tool": "Vite 6.3.5",
  "Styling": "Tailwind CSS 3.4.17",
  "HTTP Client": "Axios 1.10.0",
  "Routing": "React Router 7.6.2",
  "Notifications": "React Toastify 11.0.5"
}
```

### Backend
```json
{
  "Runtime": "Node.js",
  "Framework": "Express 5.1.0",
  "Database": "MongoDB 8.16.1 (via Mongoose ODM)",
  "Authentication": "JWT (jsonwebtoken 9.0.2)",
  "Password Hashing": "bcrypt 6.0.0",
  "File Upload": "Multer 2.0.1",
  "Cloud Storage": "Cloudinary 2.7.0",
  "Payment": "Razorpay 2.9.6, Stripe 18.2.1",
  "CORS": "cors 2.8.5",
  "Validation": "validator 13.15.15",
  "Environment": "dotenv 17.0.0",
  "Dev Tool": "Nodemon 3.1.10"
}
```

---

## Project Structure

```
E-commerce-Website/
│
├── backend/                          # Node.js/Express Backend
│   ├── server.js                     # Main server entry point
│   ├── package.json                  # Dependencies & scripts
│   │
│   ├── config/
│   │   ├── mongodb.js               # MongoDB connection setup
│   │   └── cloudinary.js            # Cloudinary image service config
│   │
│   ├── models/                       # Mongoose Schemas
│   │   ├── userModel.js             # User schema with cart data
│   │   ├── productModel.js          # Product catalog schema
│   │   └── orderModel.js            # Order tracking schema
│   │
│   ├── controllers/                  # Business Logic
│   │   ├── userController.js        # Auth, login, register
│   │   ├── productController.js     # CRUD operations for products
│   │   ├── cartController.js        # Shopping cart management
│   │   └── orderController.js       # Order processing
│   │
│   ├── routes/                       # API Endpoints
│   │   ├── userRoute.js             # /api/user/*
│   │   ├── productRoute.js          # /api/product/*
│   │   ├── cartRoute.js             # /api/cart/*
│   │   └── orderRoute.js            # /api/order/*
│   │
│   └── middleware/                   # Express Middleware
│       ├── auth.js                  # JWT token verification
│       ├── adminAuth.js             # Admin-only access control
│       └── multer.js                # File upload configuration
│
├── frontend/                         # Customer React App
│   ├── src/
│   │   ├── App.jsx                  # Main component & routing
│   │   ├── main.jsx                 # React entry point
│   │   │
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── Navbar.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Footer section
│   │   │   ├── SearchBar.jsx       # Product search
│   │   │   ├── CartTotal.jsx       # Cart summary
│   │   │   ├── ProductItem.jsx     # Individual product card
│   │   │   ├── RelatedProducts.jsx # Related items section
│   │   │   ├── BestSeller.jsx      # Best sellers carousel
│   │   │   ├── LatestCollection.jsx # New arrivals section
│   │   │   ├── Hero.jsx            # Landing banner
│   │   │   ├── OurPolicy.jsx       # Policies section
│   │   │   ├── NewsletterBox.jsx   # Email subscription
│   │   │   └── Title.jsx           # Page title component
│   │   │
│   │   ├── pages/                  # Page Components
│   │   │   ├── Home.jsx            # Homepage
│   │   │   ├── Collection.jsx      # Product listing/filtering
│   │   │   ├── Product.jsx         # Product details page
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   ├── PlaceOrder.jsx      # Checkout & order placement
│   │   │   ├── Orders.jsx          # Order history
│   │   │   ├── Login.jsx           # User authentication
│   │   │   ├── About.jsx           # About page
│   │   │   ├── Contact.jsx         # Contact page
│   │   │   └── Verify.jsx          # Payment verification
│   │   │
│   │   ├── context/
│   │   │   └── ShopContext.jsx     # Global state management (Context API)
│   │   │
│   │   ├── assets/
│   │   │   └── assets.js           # Assets URLs & static data
│   │   │
│   │   └── index.css               # Global styles
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── admin/                           # Admin Dashboard (React App)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Admin header
│   │   │   ├── Sidebar.jsx         # Navigation menu
│   │   │   └── Login.jsx           # Admin login
│   │   │
│   │   ├── pages/
│   │   │   ├── Add.jsx             # Add new product form
│   │   │   ├── List.jsx            # Product management list
│   │   │   └── Orders.jsx          # Order management
│   │   │
│   │   ├── assets/
│   │   │   └── assets.js
│   │   │
│   │   └── index.css
│   │
│   └── [config files]
│
└── README.md                         # Project documentation
```

---

## Core Features & Functionality

### 1. **User Authentication & Authorization**
- User registration with email validation & password strength check
- User login with credential verification
- JWT token-based authentication
- Admin-specific login with elevated privileges
- Secure password hashing using bcrypt (10-salt rounds)

### 2. **Product Management**
- **Admin**: Add, update, delete, view all products
- **Customers**: Browse, search, filter products by category/price
- Product details: Images (up to 4), description, price, sizes, categories
- Best-seller marking for featured products
- Dynamic filtering and sorting

### 3. **Shopping Cart**
- Add/remove items with size selection
- Persistent cart storage (local + database for logged-in users)
- Real-time cart count updates
- Cart total calculation with delivery fee

### 4. **Order Management**
- Place orders with delivery address
- Multiple payment methods supported (Razorpay, Stripe)
- Order status tracking (Order Placed → Pending → Shipped → Delivered)
- Order history for customers
- Admin dashboard for order monitoring

### 5. **Image Management**
- Cloudinary integration for image uploads
- Multiple images per product
- Automatic image optimization & CDN delivery

### 6. **Payment Processing**
- Razorpay & Stripe integration
- Payment status verification
- Failed payment handling
- Transaction records in database

---

## Data Models

### 1. **User Model**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  cartData: Object // { productId: { size: quantity } }
}
```
**Purpose**: Stores user credentials and shopping cart state
**Indexes**: Email (unique)

### 2. **Product Model**
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  image: Array (URLs from Cloudinary),
  category: String (e.g., "Men", "Women", "Kids"),
  subCategory: String (e.g., "Shirt", "Jeans"),
  sizes: Array (e.g., ["S", "M", "L", "XL"]),
  bestseller: Boolean (default: false),
  date: Number (timestamp of creation)
}
```
**Purpose**: Catalog of products available for purchase
**Indexes**: Category, subCategory for filtering

### 3. **Order Model**
```javascript
{
  _id: ObjectId,
  userId: String (reference to user),
  items: Array // [{ productId, size, price, quantity }],
  amount: Number (total order value),
  address: Object {
    firstName, lastName, email, street,
    city, state, zipcode, country, phone
  },
  status: String (default: "Order Placed"),
  paymentMethod: String ("razorpay", "stripe", "cod"),
  payment: Boolean (default: false),
  date: Number (order timestamp)
}
```
**Purpose**: Records all customer orders
**Indexes**: userId, date for querying

---

## Key Workflows

### Workflow 1: User Registration & Login
```
User Input (Frontend)
    ↓
POST /api/user/register
    ↓
Validation (email format, password strength)
    ↓
Check if user exists
    ↓
Hash password with bcrypt
    ↓
Save to MongoDB
    ↓
Generate JWT token
    ↓
Return token to frontend
    ↓
Store token in localStorage
    ↓
User authenticated ✓
```

### Workflow 2: Add Product to Cart
```
Customer clicks "Add to Cart"
    ↓
Select size (validation)
    ↓
ShopContext updates local state
    ↓
If user logged in:
  POST /api/cart/add with JWT token
    ↓
Backend validates token
    ↓
Update user's cartData in MongoDB
    ↓
Return updated cart
    ↓
Frontend shows success toast
```

### Workflow 3: Place Order
```
Customer at checkout page
    ↓
Enter delivery address
    ↓
Select payment method
    ↓
POST /api/order/place
    ↓
Backend validates:
  - User token
  - Items availability
  - Cart data
    ↓
Create order in MongoDB
    ↓
Redirect to payment gateway (Razorpay/Stripe)
    ↓
Customer completes payment
    ↓
Payment callback to backend
    ↓
POST /api/order/verifyrazorpay or verifystrike
    ↓
Verify payment signature
    ↓
Update order.payment = true
    ↓
Clear cart data
    ↓
Show order confirmation
```

### Workflow 4: Product Upload (Admin)
```
Admin fills form:
  - Product details
  - Upload 4 images
  - Categories, sizes
    ↓
POST /api/product/add with FormData
    ↓
Middleware: adminAuth validates token
    ↓
Multer saves files temporarily
    ↓
Controller:
  - Upload images to Cloudinary
  - Get secure URLs
  - Remove temp files
    ↓
Save product with image URLs to MongoDB
    ↓
Return success response
    ↓
Admin dashboard updates product list
```

---

## Backend Components

### 1. **Server Setup (server.js)**
```javascript
- Express app initialization
- MongoDB connection (connectDB)
- Cloudinary configuration (connectCloudinary)
- CORS middleware for cross-origin requests
- JSON body parser
- Route mounting:
  /api/user → userRouter
  /api/product → productRouter
  /api/cart → cartRouter
  /api/order → orderRouter
- Server listening on PORT (default: 4000)
```

### 2. **Middleware**

#### Authentication Middleware (auth.js)
```javascript
authUser:
  - Extracts JWT token from request headers
  - Verifies token signature using JWT_SECRET
  - Decodes token to get userId
  - Attaches userId to request body
  - Passes control to next middleware/route
  - Returns 401 if token invalid/missing
```

#### Admin Authentication Middleware (adminAuth.js)
```javascript
- Similar to authUser
- Additional check: user.isAdmin flag
- Returns 401 if not admin
```

#### File Upload Middleware (multer.js)
```javascript
- Configured for multiple image uploads
- Destination: temporary storage
- Max file size: typically 5-10MB
- Allowed formats: JPEG, PNG, WebP
- Field names: image1, image2, image3, image4
```

### 3. **Controllers**

#### User Controller (userController.js)
**Functions**:
- `registerUser`: Create new user account
  - Validate email format
  - Check password strength (min 8 chars)
  - Hash password with bcrypt
  - Save to MongoDB
  - Generate JWT token
  
- `loginUser`: Authenticate existing user
  - Find user by email
  - Compare provided password with stored hash
  - Generate JWT token on match
  
- `adminLogin`: Admin authentication
  - Validate credentials against admin credentials
  - Generate admin JWT token

#### Product Controller (productController.js)
**Functions**:
- `addProduct`: Upload product with images
  - Extract product details from request
  - Upload 4 images to Cloudinary
  - Collect secure URLs
  - Save product to MongoDB
  
- `listProducts`: Fetch all products
  - Query all products from MongoDB
  - Return as JSON array
  
- `removeProduct`: Delete product by ID
  - Find and delete from MongoDB
  - Also delete images from Cloudinary
  
- `singleProduct`: Get product details
  - Find product by ID
  - Return product object

#### Cart Controller (cartController.js)
**Functions**:
- `addToCart`: Add item to user's cart
  - Extract userId from JWT token
  - Get product to validate
  - Update user's cartData object
  - Save to MongoDB
  
- `removeFromCart`: Remove item
  - Extract userId
  - Remove item from cartData
  
- `getCart`: Fetch user's cart
  - Return cartData from user document

#### Order Controller (orderController.js)
**Functions**:
- `placeOrder`: Create order
  - Validate all order items exist
  - Calculate total amount
  - Create order document
  - Clear user's cart
  
- `verifyRazorpay`: Verify Razorpay payment
  - Validate signature using Razorpay secret
  - Update order.payment = true
  - Return status
  
- `verifyStripe`: Similar for Stripe
  
- `userOrders`: Get user's order history
  - Find orders by userId
  
- `allOrders`: Get all orders (admin)
  - Return all orders, sortable by date

### 4. **Routes Structure**

**User Routes** (`/api/user`)
- `POST /register` - Create account
- `POST /login` - User login
- `POST /admin-login` - Admin login

**Product Routes** (`/api/product`)
- `POST /add` [Admin] - Add product
- `GET /list` - List all products
- `DELETE /remove` [Admin] - Remove product
- `POST /single` - Get product details

**Cart Routes** (`/api/cart`)
- `POST /add` [Auth] - Add to cart
- `POST /remove` [Auth] - Remove from cart
- `GET /get` [Auth] - Get cart

**Order Routes** (`/api/order`)
- `POST /place` [Auth] - Create order
- `POST /verifyrazorpay` [Auth] - Verify Razorpay payment
- `POST /verifystrike` [Auth] - Verify Stripe payment
- `GET /userorders` [Auth] - User's orders
- `GET /list` [Admin] - All orders
- `POST /status` [Admin] - Update order status

---

## Frontend Components

### Global State Management (ShopContext.jsx)
```javascript
Context provides:
- currency: "Rs."
- delivery_fee: 100
- backendUrl: API endpoint
- cartItems: Object with cart structure
- products: Array of all products
- token: JWT token from localStorage
- search: Search query state
- showSearch: Search visibility toggle

Key Functions:
- addToCart(itemId, size): Add/update item
- removeFromCart(itemId, size): Remove item
- getCartCount(): Total item count
- getCartAmount(): Total price calculation
- getUserOrders(): Fetch user's orders
- logout(): Clear token and cart
```

### Component Hierarchy
```
App.jsx
├── Navbar (displayed on all pages)
├── Sidebar (for mobile navigation)
├── Pages (route-based)
│   ├── Home
│   │   ├── Hero
│   │   ├── LatestCollection
│   │   ├── BestSeller
│   │   ├── OurPolicy
│   │   └── NewsletterBox
│   ├── Collection
│   │   ├── SearchBar
│   │   └── ProductItem (grid of products)
│   ├── Product
│   │   ├── Product details
│   │   └── RelatedProducts
│   ├── Cart
│   │   └── CartTotal
│   ├── PlaceOrder
│   │   ├── Address form
│   │   ├── Order summary
│   │   └── Payment selection
│   ├── Orders
│   │   └── Order history
│   ├── Login
│   │   ├── Register form
│   │   └── Login form
│   ├── About
│   └── Contact
└── Footer (displayed on all pages)
```

### Key Frontend Features
- **Responsive Design**: Tailwind CSS responsive classes
- **State Management**: Context API for global shopping state
- **Routing**: React Router for page navigation
- **HTTP Requests**: Axios for API calls with interceptors
- **Notifications**: React Toastify for user feedback
- **Form Validation**: Client-side validation before submission
- **Error Handling**: Try-catch blocks and error toasts

---

## Admin Panel

### Structure
```
Admin App
├── Login Page
│   └── Email + Password authentication
│
├── Sidebar
│   ├── Add Product (navigation)
│   ├── Product List (navigation)
│   └── Orders (navigation)
│
└── Pages
    ├── Add (Add.jsx)
    │   - Form for product details
    │   - Image upload (4 images)
    │   - Category selection
    │   - Size selection
    │   - Price input
    │   - Submit to /api/product/add
    │
    ├── List (List.jsx)
    │   - Table of all products
    │   - Edit product details
    │   - Delete product (button)
    │   - Pagination
    │
    └── Orders (Orders.jsx)
        - All orders table
        - Filter by status
        - Update order status
        - View order details
```

### Admin Features
- Token-based authentication (separate from regular users)
- Product CRUD operations with image uploads
- Order status management
- Order fulfillment tracking

---

## Authentication & Security

### JWT-based Authentication
```javascript
// Token Creation (server.js)
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}
// No expiration set (security consideration)

// Token Usage (frontend)
localStorage.setItem('token', token)
axios.post(url, data, {headers: {token}})

// Token Verification (middleware)
const token_decode = jwt.verify(token, process.env.JWT_SECRET)
req.body.userId = token_decode.id
```

### Password Security
```javascript
// Hashing
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

// Verification
const isMatch = await bcrypt.compare(password, storedHash)
```

### Validation
- Email format validation using `validator` library
- Password minimum length: 8 characters
- Product input sanitization
- File type validation for uploads

### CORS Configuration
- Allows cross-origin requests from frontend/admin
- Credentials supported if needed

### Environment Variables
```
- PORT: Server port
- MONGODB_URI: Database connection string
- JWT_SECRET: Token signing key
- CLOUDINARY_NAME: Cloud storage account
- CLOUDINARY_API_KEY: Cloud storage API key
- CLOUDINARY_API_SECRET: Cloud storage secret
- STRIPE_API_KEY: Payment gateway key
- STRIPE_SECRET_KEY: Payment gateway secret
- RAZORPAY_KEY_ID: Payment gateway key
- RAZORPAY_KEY_SECRET: Payment gateway secret
```

---

## Payment Integration

### Razorpay Integration
```javascript
// Frontend
1. Create order via POST /api/order/place
2. Receive order ID from backend
3. Initialize Razorpay widget
4. Customer completes payment
5. Razorpay returns payment ID & signature
6. POST /api/order/verifyrazorpay with:
   - razorpay_order_id
   - razorpay_payment_id
   - razorpay_signature
7. Backend verifies signature
8. Update order.payment = true

// Backend
const crypto = require('crypto')
const generated_signature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(order_id + '|' + payment_id)
  .digest('hex')

if (generated_signature === received_signature) {
  // Payment verified
}
```

### Stripe Integration
- Similar flow but different signature verification
- Webhook support for payment confirmations

---

## Deployment

### Frontend & Admin Deployment (Vercel)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_BACKEND_URL": "https://api-url.com"
  }
}
```

### Backend Deployment
- Node.js compatible hosting (Heroku, Railway, Vercel, etc.)
- Environment variables configured on host
- MongoDB Atlas for managed database
- Cloudinary for image storage

### Environment Setup
```
Frontend:
- VITE_BACKEND_URL → Backend API URL

Admin:
- VITE_BACKEND_URL → Backend API URL

Backend:
- All env variables as mentioned in Authentication section
```

---

## Interview Key Talking Points

### Technical Strengths
1. **Full-Stack Development**: Proficiency in MERN stack
2. **Database Design**: Normalized schemas with proper relationships
3. **API Design**: RESTful endpoints with proper HTTP methods
4. **Authentication**: JWT token-based secure authentication
5. **File Management**: Cloud storage integration (Cloudinary)
6. **Payment Processing**: Third-party payment gateway integration
7. **State Management**: Context API for global state
8. **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Architectural Decisions
1. **Why MongoDB?**: Schema flexibility, JSON-like documents match JavaScript
2. **Why JWT?**: Stateless authentication, scalable for microservices
3. **Why Separate Admin/Frontend?**: Better code organization, different UX requirements
4. **Why Cloudinary?**: Automatic image optimization, CDN, security
5. **Why Context API?**: Lightweight state management for mid-size app (could scale to Redux)

### Challenges & Solutions
1. **Image Upload**: Used Multer + Cloudinary for efficient handling
2. **Cart Persistence**: Local storage + database sync for offline capability
3. **Payment Verification**: Webhook validation with cryptographic signatures
4. **CORS Issues**: Configured CORS middleware for cross-origin requests
5. **Cart Data Structure**: Object structure allows efficient updates (itemId → size → quantity)

### Scalability Considerations
1. Database indexing on frequently queried fields
2. Separation of concerns allows horizontal scaling
3. Stateless API design enables load balancing
4. Cloud storage prevents server disk bloat
5. JWT authentication doesn't require session storage

### Security Best Practices
1. Password hashing with bcrypt
2. JWT token verification on protected routes
3. Admin-only middleware for sensitive operations
4. Environment variables for sensitive data
5. Input validation and sanitization
6. CORS restrictions

---

## Sample Interview Q&A

**Q: How does the authentication flow work?**
A: User registers → password hashed with bcrypt → JWT token generated → token stored in localStorage → token sent in headers for subsequent requests → middleware verifies token before allowing access to protected routes.

**Q: How is the shopping cart managed?**
A: Cart data stored as nested object (itemId → size → quantity) in user document. For guest users, stored in ShopContext state (localStorage). When user logs in, cart syncs with database.

**Q: How do you handle product images?**
A: Admin uploads up to 4 images → Multer temporarily stores them → Cloudinary integration uploads to cloud → returns secure URLs → temporary files deleted → URLs saved in product document.

**Q: Explain the order placement flow.**
A: User adds items to cart → places order with delivery address → backend validates items → creates order document with "Order Placed" status → redirects to payment gateway → customer completes payment → signature verified → payment status updated → order confirmed.

**Q: Why use a separate admin panel?**
A: Cleaner separation of concerns. Admin interface has different requirements (CRUD operations vs. shopping). Easier to maintain and scale independently. Better UX for each user type.

**Q: How do you ensure only admins can add products?**
A: `adminAuth` middleware validates JWT token and checks if user has admin privileges before allowing access to `/api/product/add` route.

**Q: What data structure is used for the shopping cart?**
A: `{ productId: { size: quantity } }` - This allows O(1) lookup and update times. Examples: `{ "507f1f77bcf86cd799439011": { "M": 2, "L": 1 } }`

---

## Potential Improvements & Future Enhancements

1. **Add Expiry to JWT Tokens**: Implement refresh tokens
2. **Product Reviews & Ratings**: User feedback system
3. **Wishlist Feature**: Save favorites
4. **Stock Management**: Real-time inventory tracking
5. **Advanced Search**: Full-text search with Elasticsearch
6. **User Profiles**: Saved addresses, preferences
7. **Email Notifications**: Order confirmations, shipment updates
8. **Analytics Dashboard**: Sales, user behavior insights
9. **Multi-currency Support**: For international sales
10. **Caching Layer**: Redis for product catalog
11. **Unit & Integration Tests**: Jest, Supertest for backend
12. **API Documentation**: Swagger/OpenAPI
13. **Rate Limiting**: Prevent abuse
14. **Two-Factor Authentication**: Enhanced security
