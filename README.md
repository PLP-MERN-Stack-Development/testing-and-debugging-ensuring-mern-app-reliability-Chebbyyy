# MERN Bug Tracker

A full-stack Bug Tracker application built with the MERN stack (MongoDB, Express, React, Node.js) featuring comprehensive testing coverage for both frontend and backend.

## Features

- Report new bugs
- View list of reported bugs
- Update bug statuses (open, in-progress, resolved)
- Delete bugs
- Comprehensive test coverage

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Vitest
- React Testing Library

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Jest
- Supertest
- MongoDB Memory Server

## Project Structure

```
mern-bug-tracker/
- backend/
  - src/
    - config/
      - db.js
    - models/
      - Bug.js
    - routes/
      - bugRoutes.js
    - tests/
      - bug.test.js
    - server.js
  - package.json
  - jest.config.js
- frontend/
  - public/
    - index.html
  - src/
    - components/
      - BugItem.jsx
      - ErrorBoundary.jsx
    - lib/
      - api.js
    - App.jsx
    - App.test.jsx
    - setupTests.js
    - main.jsx
    - index.css
  - tailwind.config.js
  - vite.config.js
  - eslint.config.js
  - package.json
- README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB

## Installation

1. Clone the repository
2. Install Backend Dependencies
   cd backend
   npm install
3. Install Frontend Dependencies
   cd ../frontend
   npm install

## Environment Variables

Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-bug-tracker
NODE_ENV=development

## Running the Application

### Development Mode

Start Backend Server
cd backend
npm run dev

Start Frontend Development Server
cd frontend
npm run dev

### Production Mode

Build Frontend
cd frontend
npm run build

Start Backend in Production
cd backend
npm start

## Testing

### Backend Tests
cd backend
npm test

### Frontend Tests
cd frontend
npm test

For interactive test UI:
npm run test:ui

## API Endpoints

Base URL: http://localhost:5000/api

- GET /bugs - Get all bugs
- POST /bugs - Create a new bug
- PUT /bugs/:id - Update a bug
- DELETE /bugs/:id - Delete a bug

## Testing Approach and Coverage

### Backend Testing
- **Unit Tests**: Not applicable as there are no isolated helper functions; all logic is within route handlers.
- **Integration Tests**: Full coverage of API endpoints using Jest and Supertest. Tests mock the Mongoose model to avoid database dependencies. Covers CRUD operations: create, read, update, delete bugs. Includes error handling scenarios.
- **Test Coverage**: 100% for route handlers and model interactions in test environment.

### Frontend Testing
- **Unit Tests**: Component rendering and user interactions using Vitest and React Testing Library. Tests include form submissions, button clicks, and state updates.
- **Integration Tests**: API call mocking and UI updates verification. Ensures components render correctly with different data states (empty list, populated list).
- **Test Coverage**: Covers main App component and basic interactions; additional component tests can be expanded.

Run tests with `npm test` in respective directories.

## Debugging Techniques Used

- **Console Logging**: Added console.log statements in route handlers to track request data and responses during development.
- **Node.js Inspector**: Used `--inspect` flag with nodemon for server-side debugging, allowing breakpoints in VSCode.
- **Chrome DevTools**: Inspected network requests, component state, and console errors for frontend debugging.
- **Error Boundaries**: Implemented React Error Boundary to catch and display frontend crashes gracefully.
- **Intentional Bugs**: Introduced bugs (e.g., commented status update) to practice debugging and resolution.
- **Test-Driven Debugging**: Used failing tests to identify and fix issues in code logic.