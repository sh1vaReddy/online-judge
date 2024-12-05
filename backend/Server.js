import express from "express";
const server = express();
import dotenv from "dotenv";
dotenv.config();
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import UserRoute from "./router/User_Router.js";
import ProblemRoute from "./router/Problem_Router.js";
import TestcaseRouter from "./router/Testcase_Router.js";
import SubmissionRouter from "./router/Submission_Router.js";
import cors from "cors";


server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


server.use(cookieParser());

server.use(
  "/api/v1",
  UserRoute,
  ProblemRoute,
  TestcaseRouter,
  SubmissionRouter
);

const PORT = process.env.PORT || 3000;

ConnectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});