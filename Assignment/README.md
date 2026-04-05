# Assignment Solutions

This folder contains all 5 exercises implemented with Express middleware and Mongoose plugins.

## Exercise 1: Request Logging System
- File: `middleware/requestLogger.js`
- Logs timestamp, method, URL, status code, and response time to `logs/requests.log`.

## Exercise 2: Multi-Factor Authentication Middleware
- File: `middleware/mfa.js`
- Requires both JWT token (`Authorization: Bearer <token>`) and OTP (`x-otp-code` header or `otp` in body/query).

## Exercise 3: User Activity Tracker (Mongoose)
- Files: `plugins/userActivityTracker.js`, `models/User.js`
- Tracks login sessions and updates `lastActiveAt` automatically via middleware.

## Exercise 4: Soft Delete System (Mongoose)
- Files: `plugins/softDelete.js`, `models/Note.js`
- Marks records with `isDeleted=true` and `deletedAt` instead of removing them.
- Automatically filters deleted records from find/aggregate queries.

## Exercise 5: Data Sanitization Middleware
- File: `middleware/sanitizeInput.js`
- Sanitizes body/query/params to reduce XSS and NoSQL injection risk.

## Demo App
- File: `app.js`
- Includes logger, sanitization, DB connection, MFA routes, and model demo routes.

## Run
```bash
npm install
npm start
```

Default MongoDB URI:
`mongodb://127.0.0.1:27017/assignment_db`

Override by setting:
`MONGO_URI=<your-connection-string>`

## API Summary

### Health
- `GET /health`

### MFA Demo
- `POST /sensitive/otp/issue` with `{ "userId": "<id>", "otp": "123456" }`
- `POST /sensitive/transfer-funds`
	- Headers: `Authorization: Bearer <jwt>`, `x-otp-code: 123456`

### User Activity Tracker Demo
- `POST /users/register` with `{ "name": "Ayu", "email": "ayu@example.com", "passwordHash": "demo" }`
- `POST /users/:id/login` updates login session + last active
- `POST /users/:id/logout` updates logout session + last active
- `PATCH /users/:id/active` updates user + last active
- `GET /users/:id`

### Soft Delete Notes Demo
- `POST /notes` with `{ "title": "T", "content": "C", "ownerId": "<userId>" }`
- `GET /notes` returns only non-deleted notes
- `GET /notes/all` returns all notes including deleted
- `DELETE /notes/:id` soft deletes note
- `PATCH /notes/:id/restore` restores note

## Note
This assignment is ready to run. Ensure MongoDB is running locally or provide `MONGO_URI`.
