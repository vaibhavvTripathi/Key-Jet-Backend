const rooms = {};
let winnerArray = [];

function handleCreateRoom(userName) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const roomId = `${timestamp}-${random}`;
  return roomId;
}

function isRaceStarted(roomId) {
  if (rooms[roomId] && !rooms[roomId].raceStarted) {
    return true;
  } else {
    return false;
  }
}

function verifyAdmin(roomId, userId) {
  if (rooms.roomId && rooms[roomId].admin === userId) {
    return true;
  } else {
    return false;
  }
}

function handleUserEntry(roomId, userId) {
  if (rooms.roomId && !rooms[roomId].users.contains(userId)) {
    if(roomId[roomId].length==0) {
        room[roomId] = { users: [userName], raceStarted: false, admin: userName };
    }
    else rooms[roomId].users.push(userId);
  }
}

function handleClientData(roomId, userId, data) {
  if (data.time === 30) {
    winnerArray = [...winnerArray, data];
  }
}

function handleStartRace(roomId, userId) {
  rooms[roomId].raceStarted = true;
}

module.exports = {
  handleCreateRoom,
  verifyAdmin,
  isRaceStarted,
  handleClientData,
  handleUserEntry,
};
