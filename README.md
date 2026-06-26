# Full Stack Todo App

A full-stack Todo application built with **React**, **TypeScript**, **Express.js**, and **MySQL**.

This project allows users to create, view, search, filter, update, and delete todo tasks. It includes a clean frontend interface and a backend REST API connected to a MySQL database.

## Features

* Create new todo tasks
* View all todos
* Search todos by title or description
* Filter todos by status
* Update todo status
* Delete todos
* Delete confirmation modal
* MySQL database integration
* REST API with Express.js
* TypeScript support

## Tech Stack

### Frontend

* React
* TypeScript
* CSS
* Vite

### Backend

* Node.js
* Express.js
* TypeScript
* MySQL
* mysql2

## Todo Status Options

Each todo can have one of the following statuses:

* Pending
* In Progress
* Done

## API Endpoints

### Get All Todos

```http
GET /todos
```

Returns all todos ordered by newest first.

### Get Todo By ID

```http
GET /todos/:id
```

Returns one todo by ID.

### Create Todo

```http
POST /todos
```

Request body:

```json
{
  "title": "Learn TypeScript",
  "description": "Practice Express with TypeScript",
  "status": "pending"
}
```

### Update Todo Status

```http
PATCH /todos/:id/status
```

Request body:

```json
{
  "status": "done"
}
```

### Delete Todo

```http
DELETE /todos/:id
```

Deletes a todo by ID.

### Search and Filter Todos

```http
GET /todos/search?q=react&status=pending
```

Query parameters:

| Parameter | Description                    |
| --------- | ------------------------------ |
| `q`       | Search by title or description |
| `status`  | Filter by todo status          |

Example:

```http
GET /todos/search?q=project&status=inprogress
```

## Database Table

Create a MySQL table like this:

```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'inprogress', 'done') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend Controller Overview

The backend includes the following controller functions:

| Function           | Description                |
| ------------------ | -------------------------- |
| `getTodos`         | Gets all todos             |
| `getTodoById`      | Gets one todo by ID        |
| `createTodo`       | Creates a new todo         |
| `updateTodoStatus` | Updates the todo status    |
| `deleteTodo`       | Deletes a todo             |
| `searchTodos`      | Searches and filters todos |

## Project Structure

```txt
project-folder/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── todoController.ts
│   │   ├── routes/
│   │   │   └── todoRoutes.ts
│   │   ├── types/
│   │   │   └── todoType.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Narek-Melkumyan/todo-app-typescript
```

### 2. Go to the project folder

```bash
cd your-repository-name
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_db
```

Run the backend:

```bash
npm run dev
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

## Example Todo Object

```ts
{
  id: 1,
  title: "Finish project",
  description: "Complete full-stack todo app",
  status: "pending"
}
```

## What I Learned

While building this project, I practiced:

* React component structure
* TypeScript types and interfaces
* Express.js REST API development
* MySQL database queries
* CRUD operations
* Search and filter logic
* Backend error handling
* Connecting frontend with backend

## Future Improvements

* Add user authentication
* Add JWT login system
* Add edit todo feature
* Add due dates
* Add priority levels
* Add pagination
* Improve UI design
* Deploy frontend and backend online

## Author

**Narek Melkumyan**

* GitHub: [Narek-Melkumyan](https://github.com/Narek-Melkumyan)
* LinkedIn: [Narek Melkumyan](https://www.linkedin.com/in/narek-melkumyan-60164a374/)

## License

This project is open source and available under the MIT License.
