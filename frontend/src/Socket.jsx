import React, { createContext, useMemo, useContext, useEffect } from "react";
import io from "socket.io-client";
import { server } from './constants/config';

const SocketContext = createContext();

// Custom hook to consume the socket context
const getsocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Socket Provider Component
const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3000", { withCredentials: true }), []);

  useEffect(() => {
    // Clean up the socket connection on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider,getsocket };
