# Student Management REST API

## Setup Instructions
1. Install Node.js if not already installed.
2. Open terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`.

## Testing in Postman
- **GET All Students**: `GET http://localhost:3000/students` (Status: 200)
- **GET Student by ID**: `GET http://localhost:3000/students/1` (Status: 200 / 404)
- **CREATE Student**: `POST http://localhost:3000/students` (Status: 201)
  - Body (JSON):
    ```json
    {
      "name": "Amit Kumar",
      "email": "amit.kumar@example.com",
      "course": "Mechanical Engineering",
      "age": 21
    }
    ```
- **UPDATE Student**: `PUT http://localhost:3000/students/1` (Status: 200 / 404)
  - Body (JSON):
    ```json
    {
      "age": 22
    }
    ```
- **DELETE Student**: `DELETE http://localhost:3000/students/1` (Status: 200 / 404)
