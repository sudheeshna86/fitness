# FitnessApp Backend

This backend is built with Node.js, Express, MongoDB, and Mongoose to support the Expo fitness app.

## Setup

1. Install dependencies
   ```bash
   cd backend
   npm install
   ```

2. Configure environment
   - Copy `.env` and update values as needed.

3. Start the backend
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/users/profile`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `GET /api/workouts`
- `GET /api/workouts/:id`
- `POST /api/workouts`
- `PUT /api/workouts/:id`
- `DELETE /api/workouts/:id`
- `POST /api/workouts/:id/complete`
- `GET /api/challenges`
- `POST /api/challenges`
- `PUT /api/challenges/:id`
- `DELETE /api/challenges/:id`
- `POST /api/challenges/:id/join`
- `POST /api/challenges/:id/complete`
- `POST /api/water`
- `GET /api/water/:userId`
- `PUT /api/water/:id`
- `POST /api/sleep`
- `GET /api/sleep/:userId`
- `PUT /api/sleep/:id`
- `GET /api/analytics`

## Notes

- Backend uses JWT authentication and role-based access control.
- Admin users can manage workouts and challenges.
- Protected routes require the `Authorization: Bearer <token>` header.
