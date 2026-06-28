# Product Description Generator

A full-stack web application that generates product descriptions for food products using AI. The application consists of a React frontend and an Express.js backend.

---

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* CORS

---

## Project Structure

```
Product-description-generator/
│
├── frontend/
├── backend/
└── README.md
```

---

# How to Run Backend Locally

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a file named `.env` inside the backend folder.

Example:

```env
PORT=5000
```

### 4. Start the backend server

```bash
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

---

# How to Run Frontend Locally

### 1. Navigate to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the React application

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## Available API Endpoints

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | `/`                      | Health Check                 |
| POST   | `/api/generate`          | Generate Product Description |
| POST   | `/api/history`           | Create History               |
| GET    | `/api/history`           | Get All History              |
| GET    | `/api/history/:id`       | Get History by ID            |
| PUT    | `/api/history/:id`       | Update History               |
| DELETE | `/api/history/:id`       | Delete History               |
| GET    | `/api/history/search?q=` | Search History               |

---



## Future Improvements

* MongoDB Database
* Google Authentication
* Groq AI Integration
* User Accounts
* Persistent History
