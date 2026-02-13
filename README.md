# 🎨 AI UI Generator

> Deterministic UI generation from natural language | 3-Agent System | Claude-style UI
[![Frontend](https://img.shields.io/badge/Frontend-Render-00D4F1?style=flat&logo=render)](https://instantui-frontend.onrender.com)
[![Backend](https://img.shields.io/badge/Backend-Render-00D4F1?style=flat&logo=render)](https://instantui-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat&logo=github)](https://github.com/Yashasviid/instantUI)

---

## 📋 Assignment Requirements - COMPLETED ✅

| Requirement | Implementation |
|------------|----------------|
| **3 Agent Steps** | ✅ Planner, Generator, Explainer (explicit separation) |
| **Deterministic Components** | ✅ Fixed component library - AI cannot create new components |
| **Claude-style UI** | ✅ Left: Chat + Version History \| Right: Code + Live Preview |
| **Live Preview** | ✅ Rendered UI with actual components |
| **Iterative Modification** | ✅ Incremental edits via existingCode param |
| **Rollback** | ✅ Version history with click-to-restore |
| **Component Whitelist** | ✅ ALLOWED_COMPONENTS array + validation |
| **Error Handling** | ✅ Try/catch + validation errors |
| **Deployed** | ✅ Vercel (frontend) + Render (backend) |

---

## 🏗 Architecture
ai-ui-generator/
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── components/ # FIXED component library
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navbar.jsx
│   │   │   
│   │   ├── App.jsx    # Main UI + state
│   │   └── main.jsx   # Entry point
│   └── package.json
│
├── backend/            # Node.js + Express
│   ├── server.js      # 3 agents + API
│   └── package.json
│
└── README.md
