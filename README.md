# Expense-Tracker-Mern
A fully-featured Expense Tracker WebApp built with the MERN stack.

### Tech Stack
- Backend: Node.js, Express.js
- Frontend: React.js, Tailwind CSS
- Database: MongoDB

## Responsive
Responsive UI across mobile/tablet/desktop.


## Features
- User authentication (Login / Signup)
- Create expenses (amount, category, date)
- View expenses + charts (category wise)
- Delete expenses
- Responsive UI for mobile/tablet/desktop


## Responsive Fix (Implemented)
This project is now responsive across devices by updating layouts to remove `w-screen/h-screen` and fixed positioning and by using Tailwind responsive breakpoints (`sm`, `md`).

## Installation
### 1) Clone repository
```bash for frontend
git clone  https://github.com/Vishu152003/Expense_Tracker--frontend
```

```bash for backend
git clone  https://github.com/Vishu152003/Expense_Tracker-backend
```

### 2) Install dependencies
**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

### 3) Configure environment variables
Create a `.env` file inside `backend/` (this is required so backend can connect to MongoDB).

```env
MONGO_URI=your_mongodb_connection_string
```

### 4) Run the server
From `backend/`:
```bash
nodemon index.js 
```

### 5) Run the client
From `frontend/` (new terminal):
```bash
npm start
```

## Deployment
### 1) Build frontend
```bash
cd frontend
npm run build
```


