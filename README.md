# Campus Notifications Dashboard

A responsive, high-performance, and visually rich **Campus Notifications Dashboard** built using React, Vite, Material-UI, and TanStack React Query. The application connects to the Afford Medical evaluation backend to fetch, rank, categorize, and paginate live announcements.

---

## 🎨 Visual Design & Dynamic Color Palette

The interface is styled using a Slate-based light palette and custom accents to categorize announcements dynamically. It implements a **6-color theme system**:

1. **Indigo (`#4f46e5`)** - Primary brand color, headers, buttons, and structural navigation controls.
2. **Emerald Green (`#10b981`)** - Highlights all **Placement** announcements (green border & filled category tag).
3. **Amber Orange (`#f59e0b`)** - Highlights all **Result** announcements (yellow border & filled category tag).
4. **Violet Purple (`#8b5cf6`)** - Highlights all **Event** announcements (purple border & filled category tag).
5. **Coral Red (`#ef4444`)** - Used for **Critical** priority labels.
6. **Pink/Magenta (`#db2777`)** - Used for **High** priority labels.
7. **Cyan/Teal (`#06b6d4`)** - Used for **Medium** priority labels.

---

## 🚀 Key Features

- **Live Announcement Feed:** Displays placement notices, academic result notifications, and campus events.
- **Dynamic Search & Filters:** Instantly search through announcement titles and filter feed items by category.
- **Priority Ranking Algorithm:**
  - Rankings are calculated based on type weight (Placements = 3, Results = 2, Events = 1) and a time-decay recency score.
  - Featured priority cards display in a dedicated sidebar.
- **Dual-Query Architectural Separation:**
  - Separate query keys and hooks for the main list and the priority sidebar.
  - Automatically fetches up to 20 sidebar items by sending parallel requests, bypassing backend constraints.
- **Token Auto-Refresh & Interceptor:**
  - Auto-authenticates using student credentials and caches JWT token.
  - Checks expiration and requests a fresh token before it expires, handling the backend's strict 15-minute token limit.
  - Response interceptor automatically catches `401 Unauthorized` responses, clears the cache, acquires a new token, and retries the failed request.
- **CORS Development Proxy:**
  - Proxies all requests to `/evaluation-service` through the Vite dev server to bypass CORS mismatch headers on the external backend.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18 & TypeScript
- **Build Tool:** Vite 5
- **Styling & Components:** Material-UI (MUI v5) & Emotion
- **State & Data Fetching:** TanStack React Query v5 (Axios client)
- **Routing:** React Router DOM v6
- **Testing Runner:** Vitest & React Testing Library
- **Linting & Code Formatting:** ESLint & Prettier

---

## 💻 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Environment Configuration

Create a `.env` file in the root directory and add the following keys:

```env
VITE_API_BASE_URL=http://localhost:3000/evaluation-service
VITE_CLIENT_ID=ab7e054f-ef4c-4bd5-ae76-94813396695e
VITE_CLIENT_SECRET=BDPQVdFWCDhYwmgR
VITE_AUTH_EMAIL=a2023cs9954@imsec.ac.in
VITE_AUTH_NAME=rudra pratap singh
VITE_AUTH_ROLL_NO=2301430120125
VITE_AUTH_ACCESS_CODE=nyXQMu
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Running the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

---

## 📦 Available Scripts

In the project directory, you can run:

| Command            | Description                                                                 |
| :----------------- | :-------------------------------------------------------------------------- |
| `npm run dev`      | Runs the app in development mode on port 3000.                              |
| `npm run build`    | Compiles TypeScript and builds the app for production in the `dist` folder. |
| `npm run preview`  | Locally previews the production build.                                      |
| `npm run test:run` | Runs all unit tests once using Vitest.                                      |
| `npm run lint`     | Runs ESLint syntax and code quality checks.                                 |
| `npm run format`   | Automatically formats codebase files using Prettier.                        |

---

## 📂 Project Structure

```text
src/
├── api/             # Axios clients & endpoint configurations
├── app/             # Application entry points, providers, & routes
├── components/      # Reusable UI components (Common, Layout, Notifications)
├── hooks/           # Custom React hooks (Query & state synchronization)
├── logging/         # Client logStack endpoints integration
├── models/          # Type structures
├── pages/           # Page layouts (Home, Dashboard, Details, NotFound)
├── services/        # Business logic services (Authentication, Notifications)
├── state/           # Query keys configurations
├── styles/          # Material-UI theme configurations & global CSS
├── utils/           # Time calculation & priority ranking helpers
└── main.tsx         # Root renderer
```
