# Order Management System

A comprehensive full-stack web application for managing product orders with real-time updates, admin dashboard, and secure authentication.

## Features

### Customer Features
- **Order Placement Form**: Comprehensive form with validation for all customer and product details
- **File Upload**: Drag-and-drop image upload with format and size validation
- **Real-time Validation**: Instant feedback on form inputs
- **Success Notifications**: Clear confirmation messages after order placement

### Admin Features
- **Secure Authentication**: JWT-based login system with protected routes
- **Real-time Dashboard**: Live updates when new orders are placed
- **Order Management**: View, edit quantities, and delete orders
- **Advanced Filtering**: Search by product name and filter by date range
- **Statistics Overview**: Dashboard cards showing key metrics
- **Responsive Design**: Works seamlessly on all devices

### Technical Features
- **Real-time Updates**: WebSocket integration for instant notifications
- **File Upload Handling**: Secure image upload with validation
- **Centralized Error Handling**: Robust error management throughout the application
- **Input Validation**: Comprehensive validation on both frontend and backend
- **Responsive UI**: Modern, mobile-first design with Tailwind CSS

##  Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** (State Management)
- **React Hook Form** (Form Handling)
- **Zod** (Schema Validation)
- **Socket.IO Client** (Real-time Communication)
- **Axios** (HTTP Client)

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Socket.IO** (Real-time Communication)
- **Multer** (File Upload)
- **Express Validator** (Input Validation)
- **bcryptjs** (Password Hashing)

## Project Structure

```
order-management-system/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── store/          # Redux store and slices
│   │   └── ...
│   └── ...
├── backend/                 # Express.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── config/           # Configuration files
│   └── uploads/          # File upload directory
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/order-management
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

The frontend application will start on `http://localhost:3000`

## Admin Credentials

Default admin account is automatically created on first backend startup:

- **Email**: `admin@orderms.com`
- **Password**: `admin123`

## 📱 Usage

### For Customers
1. Visit the homepage at `http://localhost:3000`
2. Fill out the order form with all required details
3. Optionally upload a product image
4. Submit the order and receive confirmation

### For Admins
1. Visit the admin panel at `http://localhost:3000/admin`
2. Login with the provided credentials
3. View all orders in the dashboard
4. Use filters to search and sort orders
5. Edit order quantities or delete orders as needed
6. Receive real-time notifications for new orders

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/:id` - Get specific order (protected)
- `PUT /api/orders/:id/quantity` - Update order quantity (protected)
- `DELETE /api/orders/:id` - Delete order (protected)

## Design Features

- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live notifications and data updates
- **Intuitive Navigation**: User-friendly interface with clear visual hierarchy
- **Loading States**: Smooth loading animations and progress indicators
- **Error Handling**: Clear error messages and validation feedback

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- File upload security with type and size restrictions
- CORS configuration
- Helmet.js for security headers
- Protected API routes

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to services like Heroku, Railway, or DigitalOcean. Make sure to:
1. Set all environment variables
2. Use a cloud MongoDB instance
3. Configure CORS for your frontend domain

### Frontend Deployment
The frontend can be deployed to Vercel, Netlify, or similar platforms:
1. Build the application: `npm run build`
2. Set the production API URL in environment variables
3. Deploy the built application




##  Acknowledgments

- Built with modern web technologies
- Inspired by industry best practices
- Designed for scalability and maintainability