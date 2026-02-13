# 🎨 Ryze AI UI Generator

> Deterministic UI generation from natural language | 3-Agent System | Claude-style UI

[![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)](YOUR_VERCEL_URL)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=flat&logo=render)](YOUR_RENDER_URL)
[![Video](https://img.shields.io/badge/Demo-Video-red?style=flat&logo=youtube)](YOUR_LOOM_URL)

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