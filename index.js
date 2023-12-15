const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {
  handleCreateRoom,
  verifyAdmin,
  isRaceStarted,
  handleClientData,
  handleUserEntry,
} = require("./services/RoomService");

const { v4: uuidv4 } = require("uuid");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("create_room", () => {
    socket.emit("get_room_id", { id: uuidv4() });
  });

  socket.on("join_room", (data) => {
    console.log("hii");
    if (!rooms.has(data.roomId)) {
      socket.join(data.roomId);
      rooms.set(data.roomId, {
        total_participants: 1,
        participants: [{ name: data.name, cw: 0, speed: 0 }],
      });
      socket.emit("room_info", rooms.get(data.roomId));
      socket.to(data.roomId).emit("room_info", rooms.get(data.roomId));
    } else if (
      rooms.has(data.roomId) &&
      rooms.get(data.roomId).total_participants == 1
    ) {
      socket.join(data.roomId);
      rooms.set(data.roomId, {
        total_participants: 2,
        participants: [
          ...rooms.get(data.roomId).participants,
          { name: data.name, cw: 0, speed: 0 },
        ],
      });
      socket.emit("room_info", rooms.get(data.roomId));
      socket.to(data.roomId).emit("room_info", rooms.get(data.roomId));
    } else {
      socket.emit("handle_error", {
        message: "only 2 people can compete at a time",
      });
    }
  });

  socket.on("racing_currently", (data) => {
    if (!rooms.get(data.roomId)) return;
    console.log(
      rooms.get(data.roomId).participants.find((p) => p.name === data.name),
      data
    );

    rooms
      .get(data.roomId)
      .participants.find((racer) => racer.name === data.name).name = data.name;
    rooms
      .get(data.roomId)
      .participants.find((racer) => racer.name === data.name).cw = data.cw;
    rooms
      .get(data.roomId)
      .participants.find((racer) => racer.name === data.name).speed =
      data.speed;
    socket.emit("room_info", rooms.get(data.roomId));
    socket.to(data.roomId).emit("room_info", rooms.get(data.roomId));
  });

});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
