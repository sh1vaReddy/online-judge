# Online Coding Judge Platform (Code Master)

An online judge platform for competitive programming enthusiasts, built using the MERN (MongoDB, Express, React, Node.js) stack. The platform supports code submission, evaluation, and leaderboard tracking in real-time.

## Features

- **User Management**:
  - User registration and login (with JWT authentication).
  - Profile management.

- **Problem Management**:
  - Browse, search, and filter problems by tags and difficulty.
  - View problem statements with input/output examples.

- **Code Editor**:
  - Integrated code editor with syntax highlighting and support for multiple programming languages (C++, Java, JavaScript, Python).
  - Select programming languages for submission.

- **Code Evaluation**:
  - Secure sandbox for running user-submitted code.
  - Test case evaluation with detailed feedback (passed/failed).

- **Leaderboards**:
  - Track top users based on solved problems and points.
  - View personal progress and rankings.
  - Real-time leaderboard updates using WebSocket.

- **Admin Panel**:
  - Add, update, or delete problems.
  - Monitor user submissions and platform analytics.
  - Create, delete, and update contests.

## Introduction

Welcome to Code Master! This platform is designed to evaluate programming skills in a robust and scalable manner. It caters to developers, students, and professionals preparing for coding interviews or competitions.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS / Bootstrap for styling
  - Axios for API requests

- **Backend**:
  - Node.js with Express.js
  - JWT for authentication
  - Socket.io for real-time updates

- **Database**:
  - MongoDB (Atlas or self-hosted)

- **Code Execution**:
  - Docker-based isolated environment for secure code execution
  - Support for multiple languages (C++, Python, Java, etc.)

- **Deployment**:
  - Frontend: Vercel / Netlify
  - Backend: AWS / Heroku
  - Database: MongoDB Atlas

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud)
- Docker (for code execution environment)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sh1vaReddy/online-judge.git
   cd online-judge
   ```

2. Install dependencies:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Set up environment variables:
   - Backend:
     Create a `.env` file in the `backend` directory with the following keys:
     ```env
     PORT=5173
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend:
     Create a `.env` file in the `frontend` directory with the following keys:
     ```env
     REACT_APP_API_URL=http://localhost:5173
     ```

4. Run the development servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. Set up Docker for the code execution environment:
   ```bash
   docker-compose up
   ```

6. Access the application at `http://localhost:5173`.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.



## Acknowledgments

- Inspired by popular platforms like HackerRank, LeetCode, and Codeforces.
- Special thanks to the open-source community for the libraries and tools used in this project.

---

### Future Enhancements
- Additional language support and advanced problem types.
- Real-time collaboration on problems.
- Discussion forums for each problem.
- Enhanced analytics for user performance.
- Support for contest hosting and participation.
