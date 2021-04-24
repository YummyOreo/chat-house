
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
const addUser = ({ userID, userName, roomID, rooms }) => {
  // If the name is null, undefined, or '' it sets it to Guest
  console.log(rooms)
  console.log(roomID)
  if (rooms[roomID].owner == "") {
    rooms[roomID].owner = userID;
  }
  if (userName == null || userName == undefined || userName == "")
    userName = "Guest";
  /*
	userName = userName.trim()
	roomID = roomID.trim()
	*/

  //rooms[id] = { name: { RoomName }, users: { userID: userName }, names: { userName: userID }, owner: owner };
  // Adds to the user list
  rooms[roomID].users[userID] = userName;
  rooms[roomID].names[userName] = userID;
  return rooms;
};
// removes a user for the room
/*
userID: the id of the user
userName: the name of the user
roomID: the id of the room
rooms: all the rooms
*/
const removeUser = ({ userID, userName, roomID, rooms }) => {
  // deletes the user from the room
  delete rooms[roomID].users[userID];
  delete rooms[roomID].names[userName];

  // If its the owner delets the owner
  if (userID == rooms[roomID].owner) {
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
const makeRoom = ({
  RoomName,
  rooms,
  type,
  roomID
}) => {
  // Makes it
  rooms[roomID] = {
    name: RoomName,
    users: {},
    names: {},
    owner: "",
    messages: [1],
    type: type,
  };
  return rooms;
};

// exports all funcs
module.exports = { addUser, removeUser, makeRoom };
