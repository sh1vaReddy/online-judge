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
import Contactrouter from './router/Conact_router.js';
import Discussionrouter from './router/Discussion_router.js'
import {NEW_DISCUSSION} from './constants/event.js';
import { DiscussModel } from "./model/DiscussionSchema.js";

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
server.use(express.json({ limit: '50mb' }));
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
server.use("/api/v1", ContestRouter);
server.use("/api/v1", LeaderRouter,Contactrouter,Discussionrouter);


// WebSocket Namespace for Real-Time Updates
io.on('connection', (socket) => {
  console.log('User connected on namespace /api/v1:', socket.id);


  socket.on(NEW_DISCUSSION,async({problem_id, title, content })=>{
    console.log("Received discussion data:", { problem_id, title, content });
    try {
      const discussion = await DiscussModel.create({
        problem_id,
        user_id: socket.handshake.auth.user_id,  
        title,
        content,
      });
      io.of('/api/v1').emit('newDiscussion', discussion);
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  });

  socket.on('joinContest', (contestId) => {
    console.log(`User joined contest ${contestId}`);
  });

  socket.on('leaderboardupdate', (leaderboardData) => {
    console.log('Leaderboard update received:', leaderboardData);
    io.of('/api/v1').emit('leaderboardupdate', leaderboardData); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to Database
ConnectDB();

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
