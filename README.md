# DND Todo Application

A modern, production-ready Todo application with drag-and-drop functionality, built with React and Express.

## Features

- Create, read, update, and delete todos
- Drag and drop to reorder todos
- Mark todos as complete/incomplete
- Beautiful and responsive UI using Mantine
- Full-stack application with MongoDB backend
- TypeScript for better type safety

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- DND Kit for drag and drop
- Mantine UI components
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- CORS for cross-origin requests

## Setup

1. Clone the repository
2. Install MongoDB if you haven't already

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-dnd
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `POST /api/todos/reorder` - Reorder todos

## Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production server:
```bash
cd backend
npm start
```

## License

MIT 