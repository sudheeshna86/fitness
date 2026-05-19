# Fitness App – Frontend

This is the **frontend application** for the **Fitness Tracking Platform**, built using **React Native (Expo)** and **TypeScript**.

It provides a user-friendly interface for users to track workouts, hydration, sleep, and participate in challenges, with analytics and admin features.

---

## Features

### **Authentication**
- User registration and login with JWT tokens
- Persistent authentication using secure storage
- Protected screens accessible only to logged-in users
- Auto-redirect logged-in users to dashboard

### **Workout & Activity Tracking**
- Log workouts with details and completion status
- Track hydration and water intake
- Record sleep patterns and duration
- View workout history and analytics

### **Challenges**
- Browse and join fitness challenges
- Track challenge progress and completion
- Admin can create and manage challenges

### **Analytics & Dashboard**
- Visualize workout, hydration, and sleep stats
- Progress charts and summaries
- Personalized dashboard for each user

### **User Interface**
- Responsive design for mobile devices
- Modern, clean UI with theming support
- Tab navigation for quick access to features

---

## 📁 Folder Structure

```
frontend/
├── app/                    # Main app screens and navigation
│   ├── (tabs)/             # Tabbed navigation screens
│   ├── admin/              # Admin management screens
│   ├── challenge/          # Challenge details
│   ├── exercise/           # Exercise details
│   ├── workout/            # Workout details
│   └── ...                 # Other screens
├── assets/                 # Images and static assets
├── components/             # Reusable UI components
├── constants/              # Theme and config
├── hooks/                  # Custom React hooks
├── src/
│   ├── components/         # Additional components
│   ├── constants/          # Constants
│   ├── context/            # Context providers
│   ├── data/               # Static data
│   ├── hooks/              # Custom hooks
│   ├── screens/            # Main screens (e.g., DashboardScreen.tsx)
│   ├── services/           # API and business logic
│   └── utils/              # Utility functions
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── app.json                # Expo config
└── README.md               # This file
```

---

## Tech Stack

- **React Native (Expo)** – Cross-platform mobile app
- **TypeScript** – Type safety
- **React Navigation** – Navigation and routing
- **Axios** – HTTP requests and API communication
- **JWT** – Token-based authentication
- **AsyncStorage/SecureStore** – Client-side data persistence

---

## Pages & Modules

### **Authentication**
- Register and login screens
- JWT token storage and auto-login
- Role-based access (user/admin)

### **Dashboard**
- Overview of workouts, hydration, sleep, and challenges
- Quick access to active challenges and stats

### **Workouts**
- View, add, edit, and complete workouts
- Workout detail and history screens

### **Challenges**
- Browse, join, and track challenges
- Admin screens for challenge management

### **Hydration & Sleep**
- Log water intake and sleep duration
- View analytics and progress

### **Profile & Settings**
- Edit profile details
- Manage account settings

---

## Environment Setup

Create a `.env` file in the `frontend` directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
EXPO_PUBLIC_API_URL=https://your-backend-url/api
```

---

## Installation & Running

### Prerequisites
- Node.js v16+ and npm
- Expo CLI (`npm install -g expo-cli`)

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
npx expo start
```
The app will run on your device or emulator via Expo Go.

### Build for Production
```bash
eas build
```

---

## 🔗 API Integration

The frontend connects to the backend API with the following main endpoints:

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

---

## Design Features

- **Mobile-First UI** – Optimized for all devices
- **Theming** – Light/dark mode support
- **Tab Navigation** – Easy access to main features
- **Loading States** – Spinners and feedback for better UX
- **Icons & Graphics** – Visual cues for activities

---

## Security Features

- JWT token-based authentication
- Protected routes/screens
- Secure token storage
- Role-based access control (User/Admin)

---

## Deployment

### Deploy to Expo
```bash
eas build --platform android
eas build --platform ios
```

Update `EXPO_PUBLIC_API_URL` in `.env` to your production backend URL before deployment.

---

## Troubleshooting

### Issue: "Failed to fetch" API errors
- Check if backend is running and accessible
- Verify `EXPO_PUBLIC_API_URL` in `.env` matches your backend URL
- Check device/emulator network settings

### Issue: User not logged in after app restart
- Verify JWT token is saved in SecureStore/AsyncStorage
- Try logging in again

### Issue: Data not updating
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

## Author

**Chandu** – Full Stack Developer

---

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---
