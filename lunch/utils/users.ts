
// How a room looks
// rooms = { id: {name: '', users: {}, names: {}, owner: '', messages: [], ownerID: /*int*/, type: "" }
// Types: Announcements, chat, qna, discord, more

// Add a user to a room
/*
UserID: the socket id of the user
userName: the name of the user
roomID: the id of the room
rooms: all the rooms
*/
let addUser = ({ socketID, userName, roomID, rooms, token, id }) => {
  // If the name is null, undefined, or '' it sets it to Guest
  console.log(rooms)
  console.log(roomID)
  /*
	userName = userName.trim()
	roomID = roomID.trim()
	*/

  //rooms[id] = { name: { RoomName }, users: { socketID: userName }, names: { userName: socketID }, owner: owner };
  // Adds to the user list
  rooms[roomID].users[socketID] = token;
  rooms[roomID].token[token] = socketID;
  rooms[roomID].names[socketID] = userName;
  rooms[roomID].id[socketID] = id;
  return rooms;
};
// removes a user for the room
/*
userID: the id of the user
userName: the name of the user
roomID: the id of the room
rooms: all the rooms
*/
let removeUser = ({ socketID, userName, roomID, rooms, token }) => {
  // deletes the user from the room
  delete rooms[roomID].users[socketID];
  delete rooms[roomID].token[token];
  delete rooms[roomID].names[socketID];
  delete rooms[roomID].id[socketID];

  // If its the owner delets the owner
  if (token == rooms[roomID].owner) {
    rooms[roomID].owner = "";
  }
  return rooms;
};
// Makes a room
/*
roomsID: the id of the room (WIll change to making it here mby)
roomName: the name of the room
userName: the name of the ownser
owner: the iwner
userID: the id of the user
rooms: all the rooms
*/
// Needs editing when making the home page
let makeRoom = ({
  RoomName,
  rooms,
  type,
  roomID,
  token
}) => {
  // Makes it
  rooms[roomID] = {
    name: RoomName,
    users: {},
    token: {},
    names: {},
    id: {},
    owner: token,
    messages: [1],
    type: type,
  };
  return rooms;
};

// exports all funcs
module.exports = { addUser, removeUser, makeRoom };
