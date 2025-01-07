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
import ContestRouter from "./router/Constesr_Router.js";
import LeaderRouter from "./router/Leaderboard_Router.js";
import Contactrouter from "./router/Conact_router.js";
import Discussionrouter from "./router/Discussion_router.js";
import { GET_DISSCUSSION, NEW_DISCUSSION } from "./constants/event.js";
import { DiscussModel } from "./model/DiscussionSchema.js";
import { socketAuthenticator } from "./middleware/auth.js";
import { UserModel } from "./model/User.js";
import {createDiscussion,handleGetDiscussion} from './controller/Discussion.js';

dotenv.config();

const server = express();
const app = http.createServer(server);

const io = new Server(app, {
  transports: ['websocket', 'polling'],
  cors: {
    origin:process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
});

// Middleware
server.use(express.json({ limit: "50mb" }));
server.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
server.use(cookieParser());

// API Routes
server.use("/api/v1", LeaderRouter, Contactrouter, Discussionrouter,UserRoute,ProblemRoute,TestcaseRouter,SubmissionRouter,ContestRouter);

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on(NEW_DISCUSSION,async(data)=>createDiscussion(socket,data));
  socket.on(GET_DISSCUSSION,async(data)=>handleGetDiscussion(socket,data)); 
   
});

// Connect to Database
ConnectDB();

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
