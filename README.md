# 🚀 Around The U.S. – Fullstack Social Network

A production-ready fullstack photo-sharing social network built with Node.js, Express, MongoDB, and React. Features complete JWT authentication, real-time interactions, and professional deployment on Google Cloud Platform.

🌐 **Live Production API**: https://api.euaafora.pualo.com  
🌐 **Live Frontend**: https://euaafora.pualo.com

## 📋 About The Project

Around The U.S. is a modern social media platform that allows users to share their favorite photos, interact with posts through likes, and manage their personal profiles. This fullstack application demonstrates professional-grade development practices including:

- **Backend**: RESTful API with Node.js, Express, and MongoDB Atlas
- **Frontend**: Responsive React SPA with protected routes and context management
- **Production**: Deployed on Google Cloud Platform with PM2 process management

## ✨ Features

- 🔐 **Complete Authentication** - User registration, login, and JWT-based authorization
- 👤 **Profile Management** - Edit name, bio, and avatar with real-time updates
- 📷 **Photo Gallery** - Create, view, and delete photo cards
- ❤️ **Like System** - Like and unlike posts with instant visual feedback
- 🔒 **Security** - Bcrypt password hashing, JWT tokens, rate limiting, and CORS protection
- 🚦 **Error Handling** - Centralized error handling with custom error classes
- 📝 **Request Logging** - Winston-based logging for debugging and monitoring
- 🛡️ **Input Validation** - Celebrate/Joi validation for all API endpoints
- 📱 **Responsive Design** - Mobile-first UI that works on all devices
- ⚡ **Auto-recovery** - PM2 ensures server automatically restarts after crashes

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express 5.x
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: Celebrate (Joi)
- **Environment**: dotenv with separate dev/production configs
- **Logging**: Winston with file rotation
- **Security**: express-rate-limit, CORS, helmet
- **Code Quality**: ESLint (Airbnb Style Guide)

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **State Management**: Context API
- **Styling**: CSS3 with BEM methodology
- **HTTP Client**: Fetch API
- **Code Quality**: ESLint (Airbnb Style)

### DevOps & Production
- **Cloud Platform**: Google Cloud Platform (GCP)
- **Process Manager**: PM2
- **Version Control**: Git & GitHub
- **Domain**: Custom domain with SSL/TLS

## 📁 Project Structure

```
web_project_api_full/
├── backend/                    # RESTful API Server
│   ├── controllers/            # Business logic handlers
│   │   ├── users.js           # User operations
│   │   └── cards.js           # Card operations
│   ├── models/                # MongoDB Mongoose schemas
│   │   ├── user.js            # User model with validation
│   │   └── card.js            # Card model with relations
│   ├── routes/                # API route definitions
│   │   ├── users.js           # User endpoints
│   │   └── cards.js           # Card endpoints
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.js            # JWT verification
│   │   ├── validation.js      # Celebrate validators
│   │   ├── errorHandler.js    # Centralized error handling
│   │   └── logger.js          # Winston logging
│   ├── errors/                # Custom error classes
│   │   ├── BadRequestError.js
│   │   ├── UnauthorizedError.js
│   │   ├── ForbiddenError.js
│   │   ├── NotFoundError.js
│   │   └── ConflictError.js
│   ├── utils/                 # Utility functions
│   │   └── constants.js       # App constants
│   ├── .env.development       # Dev environment vars
│   ├── .env.production        # Production environment vars
│   ├── app.js                 # Express app setup
│   └── package.json
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── App.jsx        # Main app component
│   │   │   ├── Header/        # Navigation header
│   │   │   ├── Main/          # Main content & cards
│   │   │   ├── Footer/        # App footer
│   │   │   ├── Login/         # Login form
│   │   │   ├── Register/      # Registration form
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   ├── InfoTooltip/   # Success/error messages
│   │   │   └── Loader/        # Loading spinner
│   │   ├── contexts/           # React Context
│   │   │   └── CurrentUserContext.js
│   │   ├── utils/             # Helper functions
│   │   │   ├── api.js         # API client
│   │   │   ├── auth.js        # Auth API calls
│   │   │   ├── localStorage.js # Storage helpers
│   │   │   └── *FormValidation.js # Form validators
│   │   ├── blocks/            # CSS modules (BEM)
│   │   ├── images/            # Static assets
│   │   └── main.jsx           # React entry point
│   ├── .env.development       # Dev API URL
│   ├── .env.production        # Production API URL
│   ├── vite.config.js         # Vite configuration
│   └── package.json
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/aenderb/web_project_around_express.git
cd web_project_api_full
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env.development` file:
```env
PORT=3000
MONGODB_URI=mongodb://admin:password@localhost:27017/arounddb?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ALLOWED_ORIGINS=http://localhost:5173
```

Create `.env.production` file:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arounddb
JWT_SECRET=your-production-secret-key
ALLOWED_ORIGINS=https://euaafora.pualo.com
```

Start development server:
```bash
npm run dev
```

#### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create `.env.development` file:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Create `.env.production` file:
```env
VITE_API_BASE_URL=https://api.euaafora.pualo.com
```

Start development server:
```bash
npm run dev
```

#### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📡 API Endpoints

### Public Endpoints
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/signup` | Register new user | `{ email, password }` |
| POST | `/signin` | Login user | `{ email, password }` |

### Protected Endpoints (Requires JWT)

#### Users
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | - |
| GET | `/users/me` | Get current user | - |
| PATCH | `/users/me` | Update profile | `{ name, about }` |
| PATCH | `/users/me/avatar` | Update avatar | `{ avatar }` |

#### Cards
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/cards` | Get all cards | - |
| POST | `/cards` | Create new card | `{ name, link }` |
| DELETE | `/cards/:cardId` | Delete card | - |
| PUT | `/cards/:cardId/likes` | Like card | - |
| DELETE | `/cards/:cardId/likes` | Unlike card | - |

#### Testing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/crash-test` | Test server recovery (PM2) |

### Authentication
All protected routes require an `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with 10 salt rounds
- **JWT Authentication**: Tokens expire after 7 days
- **Rate Limiting**: 
  - Auth endpoints: 5 attempts per 15 minutes (production) / 100 (development)
  - General API: 100 requests per 15 minutes
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Server-side validation with Celebrate/Joi
- **Error Handling**: No sensitive information leaked in errors
- **Trust Proxy**: Configured for production reverse proxy
- **Environment Variables**: Sensitive data never committed to repository

## 🌐 Production Deployment (GCP)

The application is deployed on **Google Cloud Platform** with the following setup:

### Infrastructure
- **Compute Engine**: Ubuntu VM instance
- **Database**: MongoDB Atlas (cloud-hosted)
- **Process Manager**: PM2 for auto-restart and monitoring
- **Web Server**: Nginx as reverse proxy
- **SSL/TLS**: Let's Encrypt certificates
- **Domain**: Custom domain with DNS configuration

### Deployment Steps

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

2. **Deploy Backend**
```bash
# Clone repository
git clone <your-repo-url>
cd web_project_api_full/backend

# Install dependencies
npm install --production

# Setup environment
cp .env.production .env

# Start with PM2
pm2 start app.js --name "api-full"
pm2 save
pm2 startup
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name api.euaafora.pualo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **SSL Setup**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.euaafora.pualo.com
```

5. **Deploy Frontend**
```bash
cd ../frontend
npm install
npm run build

# Copy build files to Nginx
sudo cp -r dist/* /var/www/html/
```

### Monitoring & Maintenance
```bash
# View logs
pm2 logs api-full

# Monitor processes
pm2 monit

# Restart server
pm2 restart api-full

# View status
pm2 status
```

## 📱 Responsive Design

The frontend is fully responsive with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Edit profile information
4. Upload profile avatar
5. Create new photo cards
6. Like/unlike cards
7. Delete own cards
8. Test protected routes
9. Test crash recovery (`GET /crash-test`)

### Error Scenarios
- Invalid credentials
- Duplicate email registration
- Unauthorized card deletion
- Rate limit exceeded
- Invalid JWT token

## 📚 Documentation

For detailed information about each part:
- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🎓 Project Development

This fullstack project was developed as part of the **TripleTen Brasil** curriculum, demonstrating:
- RESTful API design
- JWT authentication patterns
- MongoDB schema design
- React component architecture
- Production deployment practices
- Security best practices
- Professional code organization

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Aender Binoto**
- GitHub: [@aenderb](https://github.com/aenderb)
- Project: [Around The U.S.](https://github.com/aenderb/web_project_around_express)

---

⭐ **Star this repository** if you found it helpful!