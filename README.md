# Mom2School

Mom2School is a web-based platform that connects **parents** and **riders** for safe and efficient lunchbox pickup and delivery services for school children.

---

## Features

### Parent

* Register child and pickup details
* Choose subscription plans
* Book riders
* View and edit profile

### Rider

* Create rider profile
* View dashboard with details
* Manage pickups and earnings

---

##  Tech Stack

### Frontend

* React.js
* React Router
* CSS

### Backend

* Node.js
* Express.js
* MongoDB

---

##  Project Structure

```
project-root/
│
├── client/       # React frontend
├── server/       # Node.js backend
└── README.md
```

---

##  Installation & Setup

### Clone the repository

```
git clone <your-repo-link>
cd project-root
```

---

###  Setup Frontend (Client)

```
cd client
npm install
npm start
```

👉 Runs on: **http://localhost:3000**

---

###  Setup Backend (Server)

```
cd server
npm install
npm run dev
```

(or)

```
node index.js
```

👉 Runs on: **http://localhost:5000**

---

## Environment Variables

Create a `.env` file inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  API Endpoints (Sample)

### Auth

* `POST /api/auth/login`
* `POST /api/auth/signup`

### Rider

* `POST /api/rider` → Create rider profile
* `GET /api/rider` → Fetch rider profile

### Parent

* `POST /api/parent` → Save parent details
* `GET /api/parent` → Fetch parent profile

---

##  Important Notes

* Make sure both **client** and **server** are running simultaneously
* If you see **“Failed to fetch”**, check:

  * Backend is running
  * Correct API URL (`http://localhost:5000`)
  * CORS is enabled

---

##  Running the App

1. Start backend
2. Start frontend
3. Open browser:

```
http://localhost:3000
```

---
