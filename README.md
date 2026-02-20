# Echo

## An AI-Enabled Microblogging/Social Platform

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&style=flat-square)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&style=flat-square)](https://react.dev)
[![Gemini 3 Flash](https://img.shields.io/badge/Gemini%203%20Flash-2026-4285F4?logo=google&style=flat-square)](https://deepmind.google/technologies/gemini)

</div>

---

## About

Echo is an intelligent microblogging and social platform built with the MERN stack. It combines the core features of a modern social media platform—posting, engaging with content, connecting with users—with an integrated AI assistant that helps you craft better posts and understand social media best practices.

---

## Features

- **Create & Share Posts** — Share thoughts, ideas, and updates with your network
- **Engage with Content** — Like and bookmark posts you want to revisit
- **Follow Users** — Build your network and see posts from people you follow
- **Profile Management** — Customize your profile with avatar, bio, and cover image
- **Dark/Light Mode** — Toggle between themes for comfortable viewing
- **AI Writing Assistant** — Chat with Echo's AI to get tips on improving your posts, growing your reach, and social media etiquette

---

## Tech Stack

| Category     | Technologies                                                                  |
| ------------ | ----------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite, Redux Toolkit, Tailwind CSS, React Router, Axios, React Icons |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs                         |
| **AI / ML**  | Google Gemini 3 Flash (2026 Unified SDK)                                      |
| **Security** | Helmet, CORS, JWT Cookie Authentication, Rate Limiting                        |

---

## Project Structure

```
echo/
├── backend/
│   ├── config/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   ├── ai.controller.js  # AI chat logic
│   │   ├── tweet.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── tweet.model.js    # Tweet schema
│   │   └── user.model.js     # User schema
│   ├── routes/
│   │   ├── ai.routes.js      # /api/v1/ai endpoints
│   │   ├── tweet.routes.js   # /api/v1/tweet endpoints
│   │   └── user.routes.js    # /api/v1/user endpoints
│   ├── src/
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Server entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance with credentials
│   │   ├── components/
│   │   │   ├── AIChatBot.jsx
│   │   │   ├── Body.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LeftSidebar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RightSideBar.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── Tweet.jsx
│   │   │   └── ui/
│   │   │       └── scrollFade.jsx
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── package.json              # Root orchestration scripts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v22+
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/MinitJain/Echo-Socials
cd echo

# Install all dependencies
npm run install-all
```

### Configuration

Create `backend/.env`:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/echo
JWT_SECRET=your_secure_jwt_secret_min_32_chars
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080
```

> [!IMPORTANT]
> Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Run Development Server

```bash
npm run dev
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

---

## API Reference

### POST /api/v1/ai/chat

Send a message to the Echo AI assistant (protected endpoint).

**Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**

```json
{
  "message": "How do I grow my reach?",
  "history": [
    { "role": "user", "parts": [{ "text": "Hello" }] },
    { "role": "model", "parts": [{ "text": "Hi! I'm Echo..." }] }
  ]
}
```

**Response:**

```json
{
  "response": "To grow your reach on social media..."
}
```

---

## Architectural Highlights

### Stateless AI Implementation

Echo uses a stateless AI architecture where conversation history is sent with each request, ensuring horizontal scalability and simplified deployment.

### Secure Authentication

JWT tokens are stored in HTTP-only cookies with secure middleware protection on all protected routes.

---

## Live Demo

🌐 https://echo-socials.vercel.app

## License

MIT
