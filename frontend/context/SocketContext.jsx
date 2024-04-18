import {createContext, useState, useEffect, useContext} from "react";
import {useAuthContext} from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {
    if (authUser) {
      // {
      //   query: {
      //     userId: authUser._id,
      //   },
      // }
      const socket = io("http://localhost:8000");

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      // socket.on("getOnlineUsers", (users) => {
      //   setOnlineUsers(users);
      // });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
};