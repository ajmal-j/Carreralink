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
  public listenForChat() {
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

  public listenForInterview() {
    const io = this.io;
    io.on("connection", (socket) => {
      socket.on("joinInterview", ({ id }) => {
        socket.join(id);
      });

      socket.on("question", ({ question, user, sender }) => {
        const isApplicantJoined = this.isJoined(user);
        if (isApplicantJoined) {
          io.to(user).emit("questionReceived", question);
        } else {
          io.to(sender).emit("applicantNotJoined");
        }
      });
    });
  }

  private isJoined(id: string) {
    const data = this.io.sockets.adapter.rooms.get(id);
    return !!data;
  }

  get io() {
    return this._io;
  }
}
