# 🚀 Full Stack Web App — Frontend Developer Internship Task

### Built by Prince Yadav


## 📋 Project Overview

This project is built as part of the **Frontend Developer Intern Assignment** for ** PrimeTrade.ai**.  
It demonstrates end-to-end frontend engineering, backend API development, and integration with secure JWT authentication.



## 🛠️ Tech Stack

### **Frontend**
- React.js (CRA)
- TailwindCSS (modern UI with gradients & glassmorphism)
- Axios
- React Router DOM
- React Icons

### **Backend**
- Node.js + Express.js
- MongoDB (via Mongoose)
- bcryptjs (for password hashing)
- JWT (for authentication)
- dotenv, cors

---

## ⚙️ Features

✅ **Authentication**
- Register / Login / Logout (JWT based)
- Password hashing with bcrypt

✅ **Dashboard**
- Add / View / Delete / Mark tasks as complete
- Responsive design with TailwindCSS
- Search & filter functionality
- Protected route (only accessible after login)

✅ **Security**
- JWT middleware validation
- Encrypted passwords
- CORS configured

✅ **Scalability**
- Modular folder structure
- Reusable components and clean code
- Easily extendable for production (Next.js + cookie-based auth)

---

## 🧩 Folder Structure

frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── services/
│ ├── App.js
│ ├── index.js
│ └── index.css
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
├── .env
└── package.json

yaml
Copy code

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/callmeprinceyadav/PrimeTrade.git
cd PrimeTrade
2️⃣ Setup Backend
bash
Copy code
cd backend
npm install
Create a .env file inside /backend:

env
Copy code
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/frontend_intern
JWT_SECRET=supersecretkey123
Start the backend:

bash
Copy code
npm run start
3️⃣ Setup Frontend
bash
Copy code
cd ../frontend
npm install
npm start
Make sure Tailwind is configured correctly.

🧪 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login existing user
GET	/api/tasks	Get all tasks (JWT protected)
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task

📁 Postman Collection
Included in /postman_collection.json

🧠 Scalability Notes
In production, move authentication to HttpOnly cookies.

Use Next.js for server-side rendering.

Deploy backend via Render, frontend via Vercel.

Use MongoDB Atlas for cloud database.

📸 Screenshots
🧍 Login / Register
Modern gradient-glass design with form validation.

📊 Dashboard
Task cards, animated buttons, and responsive layout.

👨‍💻 Author
Prince Yadav
📧 pkryadav9304@gmail.com
