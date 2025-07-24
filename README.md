# Zuno

Zuno is a full-stack task management application that allows users to sign up, log in, and manage their to-do tasks. Each user has their own task list, protected by authentication. The app provides a simple and responsive interface built with React and a secure backend powered by Express and MongoDB.

## Features

- User authentication (Signup and Login)
- Secure routes with JWT authentication
- Create, Read, Update, and Delete (CRUD) tasks
- Tasks are private and user-specific
- Persistent storage using MongoDB
- Clean and responsive frontend with React

## Tech Stack

### Frontend
- React (Vite)
- Axios
- React Hooks
- LocalStorage (JWT token management)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variables

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or MongoDB Atlas account

---

## Installation

#### In your terminal
```bash
git clone https://github.com/your-username/zuno.git
cd tasky
cd server
npm install
```
#### In your .env file
```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/tasky
JWT_SECRET=your_jwt_secret_key
```

#### Start client
```bash
npm run dev
```
#### Start server
```bash
node server.js
```


