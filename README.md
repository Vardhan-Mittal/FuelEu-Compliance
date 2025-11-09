# FuelEU Compliance System

A full-stack system built to evaluate and ensure compliance of maritime vessels with the **FuelEU Maritime** regulations.  
The system allows users to input vessel route and fuel consumption data, calculates emissions, determines compliance thresholds, and returns compliance results.

## 🚢 Project Overview
The FuelEU Maritime regulation targets the reduction of greenhouse gas (GHG) emissions from ships operating in European Union waters.  
This tool simplifies compliance calculation and reporting.

## 🧱 Tech Stack
| Layer | Technology |
|------|------------|
| Backend | Node.js, Express.js |
| Database | PostgreSQL with Prisma ORM |
| Frontend | React (optional UI extension planned) |
| Deployment | Docker (planned containerization) |

## 📂 Folder Structure
backend/
  ├─ prisma/
  │   ├─ schema.prisma
  ├─ src/
  │   ├─ routes/
  │   ├─ controllers/
  │   ├─ db.ts
  ├─ package.json

frontend/
  ├─ src/

## ⚙️ Setup Instructions
### 1. Clone Repository
git clone <your_repo_link>
cd FuelEu-Compliance-main

### 2. Setup Backend
cd backend
npm install

### 3. Configure Database
Edit .env:
DATABASE_URL="postgresql://user:password@localhost:5432/fueleu"

### 4. Run Prisma Migration
npx prisma migrate dev --name init

### 5. Start Backend
npm run dev

Backend runs at:
http://localhost:4000

## ✅ Example API Request
GET /banking/cb/R001

Returns ship route compliance data.

## 📌 Planned Enhancements
- Full UI Dashboard
- Containerization using Docker
- Automated emission factor selection
- PDF report generator

## 🧾 License
For educational and learning purposes.
