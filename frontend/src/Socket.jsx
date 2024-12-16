import React, { createContext, useContext, useMemo, useEffect } from "react";
import io from "socket.io-client";
import { server } from "./constants/config.jsx";

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // Memoize the socket instance
  const socket = useMemo(() => io(server, { withCredentials: true }), [server]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
