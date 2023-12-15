const rooms = {};
let winnerArray = [];

function  handleCreateRoom(userName) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const roomId = `${timestamp}-${random}`;
  rooms[roomId] = [{userName : userName,timestamp : 0,correctWords : 0}];
  console.log(rooms);
  return roomId;
}

function isRaceStarted(roomId) {
  if (rooms[roomId] && !rooms[roomId].raceStarted) {
    return true;
  } else {
    return false;
  }

  console.log(rooms);
}

function verifyAdmin(roomId, userId) {
  if (rooms.roomId && rooms[roomId].admin === userId) {
    return true;
  } else {
    return false;
  }

  console.log(rooms);
}

function handleUserEntry(roomId, userId) {
  if (rooms.roomId && !rooms[roomId].users.contains(userId)) {
    if (roomId[roomId].length == 0) {
      room[roomId] = { users: [userName], raceStarted: false, admin: userName };
    } else rooms[roomId].users.push(userId);
  }

  console.log(rooms);
}

function handleClientData(roomId, data) {
  let userDetails = rooms[roomId].find((item,index)=> {
    return item.userName==data.userName;
  })
 if(userDetails===null) {
  rooms[roomId].push(data);
 }
 else {
   rooms[roomId].forEach(element => {
    if(element.userName===data.userName) {
      return 
    }
   });
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
