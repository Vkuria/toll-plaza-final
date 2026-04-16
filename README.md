# 🛣️ Toll Plaza Dashboard — Full Stack Application

A full-stack vehicle toll management system built with **Angular 17** (frontend) and **NestJS** (backend).

---

## 📸 Features

| Feature | Details |
|---|---|
| **Live Dashboard** | Responsive table showing all vehicle toll records |
| **Auto Fee Calculation** | Backend calculates fee by vehicle type on every POST |
| **Filtering** | Filter by License Plate (search), Vehicle Type, and Status simultaneously |
| **New Entry Form** | Submit a new vehicle entry with live fee preview |
| **Bonus: Gov Vehicles** | Official/Government vehicles get $0 toll fee |
| **Seed Data** | 8 pre-loaded records on server start |
| **Stats Bar** | Live total revenue, paid/pending/violation counts |

---

## 🏗️ Project Structure

```
toll-plaza/
├── backend/               # NestJS API
│   ├── src/
│   │   ├── main.ts                    # Entry point, CORS setup
│   │   ├── app.module.ts              # Root module
│   │   ├── logs.controller.ts         # GET /logs, POST /logs
│   │   ├── logs.service.ts            # In-memory data store + seed data
│   │   ├── fee-calculator.service.ts  # Business logic for toll fees
│   │   └── toll-log.interface.ts      # TypeScript interfaces/types
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/              # Angular 17 App
    ├── src/
    │   ├── app/
    │   │   ├── models/
    │   │   │   └── toll-log.model.ts           # Shared interfaces (strict typing)
    │   │   ├── services/
    │   │   │   └── toll-logs.service.ts         # Angular service for API calls
    │   │   └── components/
    │   │       ├── dashboard/                   # Main dashboard view
    │   │       └── new-entry-form/              # New vehicle entry form
    │   ├── main.ts
    │   ├── index.html
    │   └── styles.css
    ├── angular.json
    ├── proxy.conf.json                          # Dev proxy → backend :3000
    └── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **npm** v9+

---

## 🚀 Running Locally

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

## 🔌 API Reference

### `GET /logs`
Returns all toll records sorted by most recent first.

**Response:**
```json
[
  {
    "id": "uuid-...",
    "licensePlate": "DL01AB1234",
    "vehicleType": "Car",
    "vehicleCategory": "Regular",
    "timestamp": "2025-01-01T10:00:00.000Z",
    "tollFee": 5.00,
    "status": "Paid"
  }
]
```

---

### `POST /logs`
Create a new toll entry. The backend calculates the fee automatically.

**Request Body:**
```json
{
  "licensePlate": "MH12XY5678",
  "vehicleType": "Truck",
  "vehicleCategory": "Regular",
  "status": "Paid"
}
```

| Field | Type | Required | Values |
|---|---|---|---|
| `licensePlate` | string | ✅ Yes | Any |
| `vehicleType` | string | ✅ Yes | `Car`, `Motorcycle`, `Truck` |
| `vehicleCategory` | string | No | `Regular`, `Official/Government` |
| `status` | string | No | `Paid`, `Pending`, `Violation` |

**Response (201):**
```json
{
  "id": "uuid-...",
  "licensePlate": "MH12XY5678",
  "vehicleType": "Truck",
  "vehicleCategory": "Regular",
  "timestamp": "2025-01-01T11:00:00.000Z",
  "tollFee": 10.00,
  "status": "Paid"
}
```

---

## 💰 Fee Schedule

| Vehicle Type | Category | Fee |
|---|---|---|
| Car | Regular | $5.00 |
| Motorcycle | Regular | $2.00 |
| Truck | Regular | $10.00 |
| Any | Official/Government | $0.00 (Bonus logic) |

---

## 🧠 Architecture Notes

### Backend
- **NestJS** with decorator-based controllers and dependency injection
- `FeeCalculatorService` — isolated service, single responsibility for fee logic
- `LogsService` — in-memory array acting as the Mock DB, seeded on startup
- Full CORS configuration for localhost Angular development

### Frontend
- **Angular 17** Standalone Components (no NgModule)
- `TollLogsService` — Angular service using `HttpClient` for all API communication
- Strict TypeScript interfaces (`TollLog`, `CreateTollLogDto`) shared across components
- Angular dev proxy forwards `/api` calls to backend, avoiding CORS issues in dev
- Real-time filter: plate search + vehicle type + status simultaneously

---

## 🛠️ Build for Production

**Backend:**
```bash
cd backend
npm run build     # Compiles TypeScript → dist/
npm start         # Runs compiled JS
```

**Frontend:**
```bash
cd frontend
npm run build     # Outputs to dist/toll-plaza-frontend/
```
Serve the `dist/` folder with any static server (nginx, serve, etc.).

---

## 📋 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17 (Standalone Components) |
| Backend | NestJS 10 (Node.js) |
| Language | TypeScript throughout |
| Styling | Pure CSS (dark theme, responsive) |
| Database | In-memory array (Mock DB) |
| HTTP Client | Angular `HttpClient` |
| API | RESTful JSON |
