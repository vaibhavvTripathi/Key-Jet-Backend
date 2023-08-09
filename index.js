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

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("userConnected" + socket.id);

  socket.on("join_room", (data) => {
    if (!isRaceStarted(data.roomId)) {
      handleUserEntry(data.roomId, data.userId);
      console.log(roomId)
      socket.join(data.roomId);
    } else {
      socket.emit("handle_error", {
        message: "The race has already been started :(",
      });
    }
  });

  socket.on("get_race_data", async (data) => {
    if (isRaceStarted(data.roomId)) {
      handleClientData(data);
      socket.to(data.roomId).emit("receive_data", data);
    }
  });
  socket.on("start_race", (data) => {
    if (verifyAdmin(data.userId)) {
      socket.emit("signal_start", { message: "Race will begin in 5 secs" });
    }
  });
});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
