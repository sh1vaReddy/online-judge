import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { ConnectDB } from "./config/db.js";
import UserRoute from "./router/User_Router.js";
import ProblemRoute from "./router/Problem_Router.js";
import TestcaseRouter from "./router/Testcase_Router.js";
import SubmissionRouter from "./router/Submission_Router.js";
import ContestRouter from './router/Constesr_Router.js';
import LeaderRouter from './router/Leaderboard_Router.js';


dotenv.config();



const server = express();
const app = http.createServer(server);

const io = new Server(app, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use(cookieParser());

// API Routes
server.use("/api/v1", UserRoute);
server.use("/api/v1", ProblemRoute);
server.use("/api/v1", TestcaseRouter);
server.use("/api/v1", SubmissionRouter);
server.use("/api/v1", ContestRouter,LeaderRouter); 


// WebSocket Namespace for Real-Time Updates
io.of("/api/v1").on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join Contest Room
  socket.on("joinContest", (contestId) => {
    socket.join(contestId);
    console.log(`User joined contest: ${contestId}`);
  });

  socket.on("message", (data) => {
    console.log("Message received from client:", data.data);
  });

  // Update Leaderboard
  socket.on("updateLeaderboard", (data) => {
    io.to(data.contestId).emit("leaderboardupdate", data.leaderboard);
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to Database
ConnectDB();




// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
