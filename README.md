
# Fitness App – Full Stack (MERN + Expo)

This is a **production-ready full-stack fitness application** with a robust **backend (Node.js, Express, MongoDB)** and a modern **mobile frontend (React Native, Expo, TypeScript)**.

It empowers users to track workouts, hydration, sleep, and challenges, with analytics, admin features, and secure authentication.

---

## 📺 Screen Recording Demo






https://github.com/user-attachments/assets/f53b4b19-9fe5-4fce-a154-4a7b7ec9bff5






---

## Features

### **Authentication**
- User registration and login with JWT tokens
- Persistent authentication (secure storage/localStorage)
- Protected routes/screens for logged-in users
- Role-based access (User/Admin)

### **Workout & Activity Tracking**
- Log, edit, and complete workouts
- Track hydration and water intake
- Record sleep patterns and duration
- View workout and activity history

### **Challenges**
- Browse, join, and track fitness challenges
- Admin can create and manage challenges

### **Analytics & Dashboard**
- Visualize workout, hydration, and sleep stats
- Progress charts and summaries
- Personalized dashboard for each user

### **Admin Features**
- Manage users, workouts, and challenges
- View platform analytics

### **User Interface**
- Responsive mobile UI (Expo/React Native)
- Modern, clean design with theming
- Tab navigation and intuitive flows

---

##  Folder Structure

```
fitness/
├── backend/                  # Node.js, Express, MongoDB backend
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth & error middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── ...
│   ├── uploads/              # Uploaded files
│   ├── package.json          # Backend dependencies
│   └── ...
├── frontend/                 # Expo React Native frontend
│   ├── app/                  # Main app screens & navigation
│   ├── assets/               # Images and static assets
│   ├── components/           # Reusable UI components
│   ├── constants/            # Theme and config
│   ├── hooks/                # Custom React hooks
│   ├── src/                  # Additional logic, screens, services
│   ├── package.json          # Frontend dependencies
│   └── ...
└── README.md                 # This file
```

---

## Tech Stack

- **Frontend:** React Native (Expo), TypeScript, React Navigation, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt,Cloudinary
- **Other:** AsyncStorage/SecureStore, REST APIs, Git & GitHub

---

## Pages & Modules

### **Frontend (Mobile App)**
- **Authentication:** Register, login, JWT storage, role-based access
- **Dashboard:** Overview of workouts, hydration, sleep, challenges
- **Workouts:** View, add, edit, complete, and history
- **Challenges:** Browse, join, track, and admin management
- **Hydration & Sleep:** Log and view analytics
- **Profile:** Edit user details
- **Admin:** Manage users, workouts, challenges

### **Backend (API Server)**
- **Auth:** Register, login, JWT, role-based middleware
- **Users:** CRUD, profile, admin management
- **Workouts:** CRUD, completion, analytics
- **Challenges:** CRUD, join, complete, analytics
- **Hydration/Sleep:** Log and retrieve data
- **Analytics:** User and platform stats

---

## Environment Setup

### Backend
1. Copy `.env.example` to `.env` and set your variables (MongoDB URI, JWT secret, etc.)
2. Install dependencies:
	```bash
	cd backend
	npm install
	```
3. Start the backend:
	```bash
	npm run dev
	```

### Frontend
1. Create a `.env` file in `frontend`:
	```env
	EXPO_PUBLIC_API_URL=http://localhost:5000/api
	```
2. Install dependencies:
	```bash
	cd frontend
	npm install
	```
3. Start the app:
	```bash
	npx expo start
	```

---

## 🔗 API Endpoints (Backend)

### **Authentication**
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login and get JWT token

### **Users**
- `GET /api/users/profile` – Get user profile
- `PUT /api/users/:id` – Update user profile

### **Workouts**
- `GET /api/workouts` – Get all workouts
- `POST /api/workouts` – Add new workout
- `PUT /api/workouts/:id` – Update workout
- `DELETE /api/workouts/:id` – Delete workout
- `POST /api/workouts/:id/complete` – Mark workout as complete

### **Challenges**
- `GET /api/challenges` – Get all challenges
- `POST /api/challenges` – Create new challenge (admin)
- `POST /api/challenges/:id/join` – Join challenge
- `POST /api/challenges/:id/complete` – Complete challenge

### **Hydration & Sleep**
- `POST /api/water` – Log water intake
- `POST /api/sleep` – Log sleep data

---

## Test Accounts

| Email             | Password | Role   |
|-------------------|----------|--------|
| demo@fitness.com  | 123456   | User   |
| admin@fitness.com | 123456   | Admin  |

---

## User Flow

1. **Register/Login** – Create account or sign in
2. **Dashboard** – View stats and quick links
3. **Track Workouts** – Add, complete, and view workout history
4. **Join Challenges** – Browse and participate in challenges
5. **Log Hydration/Sleep** – Record daily water and sleep
6. **View Analytics** – See progress and stats
7. **Profile Management** – Edit user details
8. **Admin Management** – (Admin only) manage users, workouts, challenges

---

## Design & Security Features

- **Mobile-First UI** – Optimized for all devices
- **Theming** – Light/dark mode support
- **Tab Navigation** – Easy access to main features
- **Loading States** – Spinners and feedback for better UX
- **Icons & Graphics** – Visual cues for activities
- **JWT token-based authentication**
- **Protected routes/screens**
- **Role-based access control (User/Admin)**
- **Secure token storage**

---

## Deployment

### Backend
- Deploy to platforms like Render, Heroku, or your own server
- Set environment variables for production

### Frontend
- Deploy with Expo (EAS build for Android/iOS)
- Update `EXPO_PUBLIC_API_URL` in `.env` to your production backend URL

---

## Troubleshooting

### "Failed to fetch" API errors
- Check if backend is running and accessible
- Verify API URL in frontend `.env` matches backend
- Check device/emulator network settings

### User not logged in after app restart
- Verify JWT token is saved in SecureStore/AsyncStorage
- Try logging in again

### Data not updating
- Check API responses and backend logs
- Ensure correct API endpoints are used

---

## Notes

- All API calls use JWT token in Authorization header
- Token expires in 30 days
- Challenge participation and workout completion tracked per user

---

## License

MIT License – Feel free to use this project for learning and development.

---




---

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---
