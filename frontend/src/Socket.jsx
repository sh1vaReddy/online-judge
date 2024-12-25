import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from './constants/config.jsx';

const SocketContext = createContext();

const getsocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() =>{
    const instance = io("http://localhost:3000", { withCredentials: true });
    console.log("Socket Initialized:", instance); 
    return instance;
  },
  []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getsocket };