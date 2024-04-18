import { Server } from "socket.io";

export class Socket {
  private readonly _io: Server;

  constructor() {
    this._io = new Server({
      pingTimeout: 30000,
      cors: {
        origin: "http://localhost:3000",
      },
    });
    console.log("socket server is up and running.");
  }
  public listen() {
    const io = this.io;
    io.on("connection", (socket) => {
      socket.on("joinChat", ({ id }) => {
        socket.join(id);
      });

      socket.on("message", ({ message, user }) => {
        io.to(user).emit("receiveMessage", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}
