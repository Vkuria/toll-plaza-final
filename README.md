#Toll Plaza Dashboard — Full Stack Application

A full-stack vehicle toll management system built with **Angular 17** (frontend) and **NestJS** (backend).


| **Live Dashboard** | Responsive table showing all vehicle toll records |
| **Auto Fee Calculation** | Backend calculates fee by vehicle type on every POST |
| **Filtering** | Filter by License Plate (search), Vehicle Type, and Status simultaneously |
| **New Entry Form** | Submit a new vehicle entry with live fee preview |
| **Bonus: Gov Vehicles** | Official/Government vehicles get $0 toll fee |
| **Seed Data** | 8 pre-loaded records on server start |
| **Stats Bar** | Live total revenue, paid/pending/violation counts |

---


## Prerequisites

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **npm** v9+

---

# Running Locally

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd toll-plaza
```

---

### 2. Start the Backend (NestJS)

```bash
cd backend
npm install
npm run dev
```

The API will start at **http://localhost:3000**

**Verify it's working:**
```bash
curl http://localhost:3000/logs
```
You should see 8 pre-seeded toll records.

---

### 3. Start the Frontend (Angular)

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

The Angular app will open at **http://localhost:4200**

> The Angular dev server proxies `/api/*` calls to `http://localhost:3000` automatically via `proxy.conf.json`.

---

