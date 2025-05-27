
---

# Task Manager App

A full-stack task management application with React/Next.js frontend and Node.js/Express backend.

## Features

- Create/edit tasks with title, description, deadline
- Optional PDF attachments
- List/view all tasks
- Responsive UI with Tailwind CSS
- MongoDB data persistence

## Tech Stack

**Frontend:**  
React (Next.js), Redux Toolkit, TypeScript, Tailwind CSS  
**Backend:**  
Node.js, Express, MongoDB, Mongoose  
**File Storage:**  
Google Cloud Storage (optional)

## Installation

1. Clone repository:
   ```bash
   git clone https://github.com/mayankrsagar/task-manager-app.git
   cd task-manager-app
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   ```

## Running the App

**Backend** (requires MongoDB):
```bash
cd backend
npm start  # http://localhost:8082
```

**Frontend**:
```bash
cd ../frontend
npm run dev  # http://localhost:3000
```

## Environment Setup

Create `.env` in `backend/`:

```env
PORT=8082
MONGODB_URI=mongodb://<user>:<pass>@<host>:<port>/<dbname>

# Optional Google Cloud Storage:
GCLOUD_STORAGE_BUCKET=your-bucket
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
PROJECT_ID=your-gcp-project
```

## API Endpoints

| Method | Path             | Description             | Body (JSON or form-data)                          |
| ------ | ---------------- | ----------------------- | ------------------------------------------------- |
| GET    | `/api/tasks`     | List all tasks          | —                                                 |
| POST   | `/api/tasks`     | Create a new task       | `title`, `description`, `deadline`, `linkedFile?` |
| PUT    | `/api/tasks/:id` | Update an existing task | Partial fields: any of `TaskCreate` shape         |
| DELETE | `/api/tasks/:id` | Delete a task           | —                                                 |

**File Upload:** Use `multipart/form-data` for PDF attachments.

## Project Structure

```
task-manager-app/
├── backend/          # Express API
│   ├── src/
│   │   ├── config/    # DB connection
│   │   ├── models/    # Mongoose schemas
│   │   └── routes/    # API endpoints
├── frontend/         # Next.js app
│   ├── app/          # Page routes
│   ├── components/   # React components
│   └── store/        # Redux setup
```

## File Storage

For PDF attachments, either:
1. Store base64 strings in MongoDB (default)
2. Enable Google Cloud Storage:
   - Create GCP bucket
   - Add service account credentials
   - Set environment variables (see above)

---

