"use client";

import { Server } from "@/lib/server";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children?: ReactNode;
}

interface ISocketContext {
  socket: Socket;
}

const SocketContext = React.createContext<Partial<ISocketContext>>({});

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const server = new Server()._chatServer;
    const _socket = io(server);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const state = useContext(SocketContext);
  return state;
};
