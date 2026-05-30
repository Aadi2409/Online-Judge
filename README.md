# Online-Judge
A full-stack competitive programming platform — built from scratch using the MERN stack with Docker-sandboxed code execution, JWT authentication, and an async submission pipeline.

---

# 🚀 Project Overview

Online Judge is a platform that hosts coding competitions where participants submit solutions that are automatically evaluated against hidden test cases.

This project replicates core features of platforms like **Codeforces**, **CodeChef**, and **LeetCode**.

The system handles real-world engineering challenges:

* **Thundering Herd** → thousands of simultaneous submissions handled using async queues
* **Malicious Code Execution** → sandboxed inside Docker containers
* **Verdict Integrity** → protected using JWT authentication and RBAC
* **Scalability** → asynchronous workers and distributed evaluation pipelines

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Monaco Editor
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT Authentication
* bcrypt password hashing

## Code Execution

* Docker
* Child Process
* BullMQ / Redis Queue

## Deployment

* Render / Railway / AWS
* MongoDB Atlas

---

# 📂 Project Structure

```bash
OnlineJudge/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── queue/
│   ├── compiler/
│   ├── docker/
│   └── server.js
│
├── README.md
└── docker-compose.yml
```

---

# ✨ Features

## 👤 Authentication

* User Signup/Login
* JWT Authentication
* Protected Routes
* Role-based Access Control

## 🧠 Coding Arena

* Monaco Code Editor
* Multi-language Support
* Custom Input Support
* Real-time Verdict Display

## 📚 Problems

* Problem Listing
* Difficulty Levels
* Tags
* Constraints and Examples

## ⚡ Submission Pipeline

* Async Job Queue
* Dockerized Execution
* Hidden Test Cases
* Memory and Time Limits

## 🏆 Leaderboard

* Contest Rankings
* Submission History
* Accepted Submissions Count

## 🔒 Security

* Docker Sandboxing
* Rate Limiting
* Input Sanitization
* Secure JWT Handling

---

# 🧱 High Level Design

## Architecture Flow

```text
Frontend (React)
        ↓
Express Backend API
        ↓
MongoDB Database
        ↓
Submission Queue (BullMQ/Redis)
        ↓
Docker Sandbox
        ↓
Execution Result
        ↓
Verdict Stored in DB
        ↓
Frontend Updates
```

---

# 🗃️ Database Design

## Users Collection

```js
{
  username,
  email,
  password,
  role,
  solvedProblems,
  submissions
}
```

## Problems Collection

```js
{
  title,
  statement,
  difficulty,
  constraints,
  examples,
  tags,
  timeLimit,
  memoryLimit
}
```

## TestCases Collection

```js
{
  problemId,
  input,
  expectedOutput,
  isHidden
}
```

## Submissions Collection

```js
{
  userId,
  problemId,
  code,
  language,
  verdict,
  executionTime,
  memoryUsed
}
```

---

# 🔥 API Endpoints

## Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Problem Routes

```http
GET    /api/problems
GET    /api/problems/:id
POST   /api/problems
PUT    /api/problems/:id
DELETE /api/problems/:id
```

## Submission Routes

```http
POST /api/submissions
GET  /api/submissions/:id
GET  /api/submissions/user/:userId
```

---

# 🐳 Docker Sandbox

Each code submission runs inside an isolated Docker container.

## Security Features

* CPU Limit
* Memory Limit
* Timeout Protection
* Filesystem Isolation

## Supported Languages

* C++
* Java
* Python
* JavaScript

---

# 📅 Development Roadmap

## Week 1 — Foundation

* [ ] **Day 1 — Project Setup**
  Initialize frontend & backend, setup folder structure, install dependencies

* [ ] **Day 2 — Database Design**
  Design MongoDB schemas and connect MongoDB Atlas

* [ ] **Day 3 — Authentication Backend**
  Create Register/Login APIs using JWT & bcrypt

* [ ] **Day 4 — Authentication Frontend**
  Build Login & Signup pages with protected routes

* [ ] **Day 5 — Problem Module**
  Create problem schema, APIs, and problem listing page

* [ ] **Day 6 — Problem Details Page**
  Build detailed problem page with examples & constraints

* [ ] **Day 7 — Code Editor Integration**
  Integrate Monaco Editor for coding arena

---

## Week 2 — Online Judge Core

* [ ] **Day 8 — Submission API**
  Create submission endpoint and save submissions

* [ ] **Day 9 — Local Code Execution**
  Execute code using child_process

* [ ] **Day 10 — Verdict Engine**
  Compare outputs and generate verdicts

* [ ] **Day 11 — Docker Integration**
  Sandbox execution using Docker containers

* [ ] **Day 12 — Queue System**
  Setup BullMQ + Redis async queue

* [ ] **Day 13 — Submission History**
  Show previous submissions and verdict logs

* [ ] **Day 14 — Leaderboard**
  Build rankings and scoring system

---

## Week 3 — Advanced Features

* [ ] **Day 15 — Security**
  Add rate limiting, validation, and RBAC

* [ ] **Day 16 — Optimization**
  Add caching and database indexing

* [ ] **Day 17 — Admin Panel**
  Create admin controls for problems and users

* [ ] **Day 18 — Contest System**
  Build contest creation and participation flow

* [ ] **Day 19 — Testing**
  Stress test APIs and submission pipeline

* [ ] **Day 20 — Deployment**
  Deploy frontend, backend, Redis, and MongoDB

* [ ] **Day 21 — Documentation**
  Finalize README, HLD, and project docs

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/TrueJudge.git
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📌 Learning Goals

This project teaches:

* MERN Stack Development
* Authentication Systems
* Secure Code Execution
* Docker Sandboxing
* Queue Architecture
* Scalable Backend Design
* Real-world System Design

---

# 🚀 Future Improvements

* Real-time Contests
* WebSocket Integration
* AI-generated Hints
* Plagiarism Detection using MOSS
* Discussion Forums
* Analytics Dashboard

---

# 👨‍💻 Author

Aditya Marathe

---

# 🎯 Final Goal

Build a scalable and secure Online Judge capable of handling thousands of code submissions with Docker sandboxing and asynchronous processing.
