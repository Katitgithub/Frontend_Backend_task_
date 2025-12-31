# Frontend Developer Task – Full Stack Web Application

## 📌 Project Overview
This project is a full-stack web application built as part of the **Frontend Developer Intern assignment**.  
It demonstrates modern frontend development, secure authentication, backend API integration, and a scalable project structure.

The application includes:
- User authentication using JWT
- Secure password hashing
- Protected dashboard
- CRUD operations on a sample entity (Tasks)
- Clean, responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Logout functionality

### 📊 Dashboard
- Create, Read, Update, Delete (CRUD) tasks
- Mark tasks as completed / pending
- User-specific data access
- Secure API calls with JWT

### 🎨 UI/UX
- Responsive design
- Clean and professional layout
- Tailwind CSS styling

## Scaling the Application for Production

For production-scale deployment, the application can be scaled as follows:

- Frontend and backend would be deployed as separate services.
- Frontend can be hosted on platforms like Vercel or Netlify.
- Backend APIs can be containerized using Docker and deployed on cloud platforms such as AWS or Render.
- A load balancer can be used to distribute traffic across multiple backend instances.
- MongoDB Atlas provides horizontal scaling and replica sets for high availability.
- JWT tokens can be enhanced with refresh tokens for better session management.
- Caching (Redis) can be introduced to reduce database load.
- Environment variables and secrets would be managed securely using cloud secret managers.

