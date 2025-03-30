
# API Documentation for Time Leaderboard Server

This document provides an overview of the API endpoints available in the Time Leaderboard server application. The server is built using Node.js, Express, and Prisma, and it interacts with a PostgreSQL database.

---

## Base URL

```
http://localhost:3001
```

---

## General Middleware

- **CORS**: Enabled for cross-origin requests.
- **Morgan**: Logs HTTP requests in the console.
- **Static Files**: Serves static files from the public directory.
- **Authorization Middleware**: All routes require an `X-Auth-Token` header with a pre-defined token to authenticate requests.

---

## Authorization

All API requests (except for explicitly exempted routes) require an `X-Auth-Token` header with a pre-defined token. If the header is missing or invalid, the server will respond with a `401 Unauthorized` status.

### Example Header

```
X-Auth-Token: your-predefined-token
```

Replace `your-predefined-token` with the actual token configured in the server.

---

## Endpoints

### **Teams API**

Base URL: `/api/teams`

| Method | Endpoint          | Description                 | Request Body                   | Response                                                       |
| ------ | ----------------- | --------------------------- | ------------------------------ | -------------------------------------------------------------- |
| POST   | `/`             | Create a new team           | `{ "name": "Team Name" }`    | `201 Created` with the created team object.                  |
| GET    | `/`             | Get all teams               | None                           | `200 OK` with an array of all teams.                         |
| GET    | `/:id`          | Get a team by ID            | None                           | `200 OK` with the team object or `404 Not Found`.          |
| PUT    | `/:id`          | Update a team by ID         | `{ "name": "Updated Name" }` | `200 OK` with the updated team object or `404 Not Found`.  |
| DELETE | `/:id`          | Delete a team by ID         | None                           | `200 OK` with the deleted team object or `404 Not Found`.  |
| GET    | `/:id/sessions` | Get all sessions for a team | None                           | `200 OK` with an array of sessions associated with the team. |
| GET    | `/:id/results`  | Get all results for a team  | None                           | `200 OK` with an array of results associated with the team.  |

---

### **Sessions API**

Base URL: `/api/sessions`

| Method | Endpoint         | Description                   | Request Body                     | Response                                                         |
| ------ | ---------------- | ----------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| POST   | `/`            | Create a new session          | `{ "title": "Session Title" }` | `201 Created` with the created session object.                 |
| GET    | `/`            | Get all sessions              | None                             | `200 OK` with an array of all sessions.                        |
| GET    | `/latest`      | Get the latest session        | None                             | `200 OK` with the latest session object or `404 Not Found`.  |
| GET    | `/:id`         | Get a session by ID           | None                             | `200 OK` with the session object or `404 Not Found`.         |
| PUT    | `/:id`         | Update a session by ID        | `{ "title": "Updated Title" }` | `200 OK` with the updated session object or `404 Not Found`. |
| DELETE | `/:id`         | Delete a session by ID        | None                             | `200 OK` with the deleted session object or `404 Not Found`. |
| GET    | `/:id/results` | Get all results for a session | None                             | `200 OK` with an array of results associated with the session. |
| GET    | `/:id/teams`   | Get all teams for a session   | None                             | `200 OK` with an array of teams associated with the session.   |

---

### **Results API**

Base URL: `/api/results`

| Method | Endpoint | Description           | Request Body                                            | Response                                                        |
| ------ | -------- | --------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| POST   | `/`    | Create a new result   | `{ "sessionId": "ID", "teamId": "ID", "score": 100 }` | `201 Created` with the created result object.                 |
| GET    | `/`    | Get all results       | None                                                    | `200 OK` with an array of all results.                        |
| GET    | `/:id` | Get a result by ID    | None                                                    | `200 OK` with the result object or `404 Not Found`.         |
| PUT    | `/:id` | Update a result by ID | `{ "sessionId": "ID", "teamId": "ID", "score": 150 }` | `200 OK` with the updated result object or `404 Not Found`. |
| DELETE | `/:id` | Delete a result by ID | None                                                    | `200 OK` with the deleted result object or `404 Not Found`. |

---

### **ESP32 Live Score API**

| Method | Endpoint                | Description                                     | Request Body         | Response                                                 |
| ------ | ----------------------- | ----------------------------------------------- | -------------------- | -------------------------------------------------------- |
| POST   | `/esp`                | Upload a new score from ESP32                   | `{ "score": 100 }` | `200 OK` with a confirmation message and the score.    |
| GET    | `/api/esp-live-score` | Get live score updates via SSE (for client use) | None                 | Server-Sent Events (SSE) stream with live score updates. |

---

### **Root Endpoint**

| Method | Endpoint | Description     | Request Body | Response                        |
| ------ | -------- | --------------- | ------------ | ------------------------------- |
| GET    | `/`    | Test the server | None         | `200 OK` with "Hello World!". |

---

## Database Models

### **Team**

- `id`: Unique identifier (String, `@id`).
- `name`: Name of the team (String).
- `createdAt`: Timestamp of creation.
- `updatedAt`: Timestamp of last update.

### **Session**

- `id`: Unique identifier (String, `@id`).
- `title`: Title of the session (String).
- `createdAt`: Timestamp of creation.
- `updatedAt`: Timestamp of last update.

### **Result**

- `id`: Unique identifier (String, `@id`).
- `teamId`: Foreign key referencing `Team`.
- `sessionId`: Foreign key referencing `Session`.
- `score`: Integer score.
- `createdAt`: Timestamp of creation.
- `updatedAt`: Timestamp of last update.

---

## Environment Variables

- `DATABASE_URL`: Connection string for the database.
- `DIRECT_URL`: Direct connection string for migrations.
- `AUTH_TOKEN`: Pre-defined token for the `X-Auth-Token` header.

---

## Notes

- **Error Handling**: All endpoints return appropriate HTTP status codes and error messages.
- **SSE**: The `/api/esp-live-score` endpoint uses Server-Sent Events (SSE) to provide real-time updates.
- **Authorization**: Ensure the `X-Auth-Token` header is included in all requests to access the API.

---

This concludes the updated API documentation for the Time Leaderboard server.
