# TaskManager
**TaskManager** This is a Full-Stack Task Manager application that allows Admins to assign tasks to Users, and users can track the status of their tasks. The application uses JWT authentication to secure routes and features. Admins and users have separate dashboards to manage and view tasks effectively.

# Note
Admin only can assign a task to an user who have created there account.


## 🌐 Live Demo

👉 [Visit TaskManager Live](https://task-manager-blond-kappa.vercel.app)


---

## ✨ Features

**1. Admin Features**
- View all users.
- Assign tasks to users.
- Track task status for all users.
- View statistics (New, Completed, Accepted, Failed tasks).

**2. User Features**
- View assigned tasks.
- Update task status.
- Search tasks by keywords.

**3. Common Features**
- JWT authentication.
- Secure role-based access.
- Responsive design.
- Task search functionality.

---

## ⚙️ Installation

1. Clone the repository:  
```bash
git clone https://github.com/yogesh-chaturvedi/TaskManager

cd TaskManager
```
2. Setup Backend:
```bash
cd backend
npm install

#Create a .env file in the backend directory
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

npm run dev
```

3. Setup Frontend
```bash
cd frontend
npm install

npm run dev
```

---

## 🚀 Tech Stack
### Frontend

- React.js
- Tailwind CSS
- Axios
- React Router
- Lucide react

### Backend

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- dotenv for config
- JWT for Authentication
- bcrypt for Password Hashing
- cors for API Security
- joi for Input Validation

---

## 👤 Author
- Name: Yogesh Chaturvedi
- GitHub: [@yogesh-chaturvedi](https://github.com/yogesh-chaturvedi)