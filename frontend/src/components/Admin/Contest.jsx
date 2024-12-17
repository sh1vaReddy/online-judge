import  { useEffect } from "react";
import { io } from "socket.io-client";

const Contest = () => {
  const socket = io("http://localhost:3000/api/v1");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);

      // Join a contest room
      socket.emit("joinContest", "contest123");

      // Listen for leaderboard updates
      socket.on("leaderboardupdate", (leaderboard) => {
        console.log("Leaderboard updated:", leaderboard);
      });
      socket.emit("message",{data:"hello"});
    });

    return () => {
      socket.disconnect(); // Cleanup on component unmount
    };
  }, []);

  return <div>Contest Component</div>;
};

export default Contest;
