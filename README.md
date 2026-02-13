# 🎨 InstantUI - AI UI Generator

> Natural language → Deterministic UI code with Live Preview | React + Express

[![Frontend](https://img.shields.io/badge/Frontend-Render-00D4F1?style=flat&logo=render)](https://instantui-frontend.onrender.com)
[![Backend](https://img.shields.io/badge/Backend-Render-00D4F1?style=flat&logo=render)](https://instantui-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat&logo=github)](https://github.com/Yashasviid/instantUI)

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React
- Vite
- JavaScript
- Fixed UI Components:
  - Button
  - Card
  - Input
  - Table
  - Modal
  - Sidebar
  - Navbar

### ⚙️ Backend
- Node.js
- Express.js
- CORS
- RESTful JSON API (`server.js`)

### ☁️ Deployment & Workflow
- Render.com (Auto Deploy)
- GitHub (Version Control)
- Monorepo Architecture
- Static Site Build (`dist/`)

### 🤖 AI / ML
- Hugging Face Inference API
- 3-Agent Pipeline:
  - Planner
  - Generator
  - Explainer

---


## ✨ Features

- **Text → UI**: Describe interface → Get working React code instantly
- **Live Preview**: Real components render in real-time 
- **Version History**: Chat context + rollback to previous versions
- **Iterative Edits**: "Make more minimal" → Incremental changes
- **3-Agent System**: Planner → Generator → Explainer pipeline

---

## 🏗️ Architecture
instantUI/
│
├── client/
│   └── frontend/
│       ├── src/
│       │   └── components/
│       │       ├── Button.jsx
│       │       ├── Card.jsx
│       │       ├── Input.jsx
│       │       ├── Table.jsx
│       │       ├── Modal.jsx
│       │       ├── Sidebar.jsx
│       │       └── Navbar.jsx
│       │
│       ├── main.jsx
│       ├── App.jsx
│       └── index.html
│
│   ├── dist/                # Static build (Render deploy)
│   └── package.json         # Vite config
│
├── server/
│   ├── server.js            # Express + AI agent pipeline
│   └── package.json
│
└── README.md
ss + 3-agent AI pipeline
└── package.json

---



