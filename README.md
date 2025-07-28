# 🎬 Movie App — Full Stack Application

A full-stack movie application built with **React (Vite + Tailwind)** on the frontend and **Express + MongoDB** on the backend. Supports user authentication via email and Google OAuth, and allows interaction with a movies database.

---

## 📁 Project Structure

movie_app/
├── client/ # Frontend - React + Vite
└── server/ # Backend - Express + MongoDB + TypeScript

## yaml

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie_app.git
cd movie_app
```

### 2.🖥️ Frontend (React + Vite)

▶️ Scripts

```bash

cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

- 🧪 Testing
  Uses Vitest and Testing Library

UI tests can be run with:

```bash

npm run test:ui
🔧 Backend (Express + MongoDB)

```

- 📦 Tech Stack

React

lucide-react

tailwindcss

React-router-dom

vitest

### 3.🖥️ Backend (TypeScript + Express + MongoDB)

▶️ Scripts

```bash

cd backend

# Install dependencies
npm install


# Build TypeScript
npm run build

# Start production server
node dist/server.js
```

- 📦 Tech Stack

MongoDB with Mongoose

Passport.js (Local & Google OAuth 2.0)

JSON Web Tokens (JWT)

TypeScript

dotenv, bcrypt, cookie-parser, cors

### 4.🔐 Environment Variables

- Create a .env file in the backend directory:

PORT
OTHER_VARIABLE
DB_USER
DB_PASSWORD
DB_NAME
JWT_KEY

FRONTEND_URL

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SESSION_SECRET

- Create a .env file in the frontend directory:

VITE_API_URL
VITE_TITLE

⚠️ The exact routes will depend on your implementation — update accordingly.

📄 License
This project is licensed under the MIT License.

Made with ❤️ using React, Express, MongoDB & Passport
