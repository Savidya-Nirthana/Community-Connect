<p align="center">
  <img src="logo/logo-sample-1.png" alt="Community Connect Logo" width="120" />
</p>

<h1 align="center">🌐 Community Connect</h1>

<p align="center">
  A full-stack web platform that brings communities together by enabling seamless event discovery, creation, and management — all in one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Storage-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
</p>

---

## 📖 About

**Community Connect** is a modern community engagement platform where users can:

- 🔐 **Sign up & Sign in** securely via OTP-based email verification
- 📅 **Create & manage community events** with rich details (title, description, category, dates, location, banner images)
- 🗺️ **Discover events on Google Maps** with interactive location-based browsing
- 🎨 **Experience a beautiful, responsive UI** powered by Material UI and Tailwind CSS with smooth animations
- 🛡️ **Role-based access** — separate flows for regular users and admins

---

## 🏗️ Architecture Overview

```
CommunityConnect/
├── backend/          # Express.js REST API server
│   ├── config/       # Database & Firebase configuration
│   ├── controllers/  # Route handler logic
│   ├── middlewares/   # Auth, error handling, file upload, logging
│   ├── models/       # Mongoose schemas (User, Event, Web)
│   ├── routes/       # API route definitions
│   ├── utils/        # Utility helpers
│   └── server.mjs    # Application entry point
│
├── web/              # React SPA (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components (NavBar, Banner, Event, Events)
│   │   ├── contexts/     # React Context providers (Auth, Notification)
│   │   ├── pages/        # Page-level views (Home, Authentication)
│   │   ├── routes/       # Client-side routing config
│   │   ├── services/     # API service layer (Axios)
│   │   ├── lib/          # Shared utilities
│   │   └── assets/       # Static assets
│   └── index.html
│
└── logo/             # Brand logo assets
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Express 5** | Web framework & REST API |
| **MongoDB + Mongoose 9** | NoSQL database & ODM |
| **JWT (jsonwebtoken)** | Token-based authentication |
| **bcrypt** | Password / OTP hashing |
| **Nodemailer** | Email delivery (OTP verification) |
| **Firebase** | Cloud storage for media (banners, images) |
| **Multer** | Multipart file upload handling |
| **cookie-parser** | Secure cookie management |
| **CORS** | Cross-origin resource sharing |

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite 7** | Build tool & dev server |
| **Material UI (MUI) 7** | Component library & icons |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Motion (Framer Motion)** | Animations & transitions |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client for API requests |
| **Google Maps API** | Interactive map integration |
| **Day.js** | Date formatting & manipulation |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Firebase** project (for cloud storage)

### 1. Clone the Repository

```bash
git clone https://github.com/Savidya-Nirthana/Community-Connect.git
cd Community-Connect
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Firebase (see config/firebaseConfig.js)
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the development server:

```bash
npm run dev
```

The backend will run on **http://localhost:4000**.

### 3. Setup Frontend

```bash
cd web
npm install
```

Create a `.env` file in the `web/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the development server:

```bash
npm run dev
```

The frontend will run on **http://localhost:5173**.

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/v1`.

### User Routes (`/api/v1/user/`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login with email + OTP |
| POST | `/verify-otp` | Verify the OTP sent via email |
| GET | `/profile` | Get authenticated user profile |

### Event Routes (`/api/v1/event/`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all events |
| POST | `/create` | Create a new event |
| PUT | `/:id` | Update an existing event |
| DELETE | `/:id` | Delete an event |

### UI Content Routes (`/api/v1/ui/`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get website UI content |
| POST | `/update` | Update dynamic web content |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/test` | Simple server health check |

---

## 📂 Data Models

### User

| Field | Type | Description |
|---|---|---|
| `email` | String | Unique email address |
| `firstname` | String | User's first name |
| `lastname` | String | User's last name |
| `dob` | Date | Date of birth |
| `occupation` | String | User's occupation |
| `role` | Enum | `admin` or `user` |
| `otp` | Number | One-time password for verification |
| `otpExpires` | Date | OTP expiration timestamp |

### Event

| Field | Type | Description |
|---|---|---|
| `title` | String | Event title |
| `description` | String | Event description |
| `date` | [Date] | Array of event dates |
| `location` | Object | Location data (lat/lng, address) |
| `bannerUrl` | String | URL to event banner image |
| `category` | String | Event category |

### Web (UI Content)

| Field | Type | Description |
|---|---|---|
| `contain` | String | Content payload |
| `url` | String | Associated resource URL |
| `updateBy` | String | Last updated by (user identifier) |

---

## 🔐 Authentication Flow

```
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│   Frontend   │  email   │   Backend    │   OTP    │  Nodemailer  │
│  (React App) │ ───────► │  (Express)   │ ───────► │  (Email)     │
│              │          │              │          │              │
│              │  OTP     │  Verify OTP  │          │              │
│              │ ───────► │  Issue JWT   │          │              │
│              │ ◄─────── │  Set Cookie  │          │              │
└──────────────┘   JWT    └──────────────┘          └──────────────┘
```

1. User submits their **email address**
2. Backend generates a **one-time password (OTP)** and sends it via **Nodemailer**
3. User enters the OTP received in their inbox
4. Backend **verifies the OTP**, issues a **JWT**, and sets it in a **secure HTTP-only cookie**
5. Subsequent requests are authenticated via the JWT cookie

---

## 🧑‍💻 Development

| Command | Location | Description |
|---|---|---|
| `npm run dev` | `backend/` | Start backend with Nodemon (hot reload) |
| `npm run dev` | `web/` | Start Vite dev server (HMR) |
| `npm run build` | `web/` | Build production frontend bundle |
| `npm run lint` | `web/` | Run ESLint checks |
| `npm run preview` | `web/` | Preview production build locally |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---


