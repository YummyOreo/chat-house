// How a room looks
// houses = { id: {name: '', users: {}, names: {}, owner: '', messages: [], ownerID: /*int*/, type: "" }
// Types: Announcements, chat, qna, discord, more

// Add a user to a room
/*
UserID: the socket id of the user
userName: the name of the user
houseID: the id of the room
houses: all the houses
*/
const addUser = ({ userID, userName, houseID, houses }) => {
  // If the name is null, undefined, or '' it sets it to Guest
  if (houses[houseID].owner == "") {
    houses[houseID].owner = userID;
  }
  if (userName == null || userName == undefined || userName == "")
    userName = "Guest";
  /*
	userName = userName.trim()
	houseID = houseID.trim()
	*/

  //houses[id] = { name: { RoomName }, users: { userID: userName }, names: { userName: userID }, owner: owner };
  // Adds to the user list
  houses[houseID].users[userID] = userName;
  houses[houseID].names[userName] = userID;
  return houses;
};
// removes a user for the room
/*
userID: the id of the user
userName: the name of the user
houseID: the id of the room
houses: all the houses
*/
const removeUser = ({ userID, userName, houseID, houses }) => {
  // deletes the user from the room
  delete houses[houseID].users[userID];
  delete houses[houseID].names[userName];

  // If its the owner delets the owner
  if (userID == houses[houseID].owner) {
    houses[houseID].owner = "";
  }
  return houses;
};
// Makes a room
/*
housesID: the id of the room (WIll change to making it here mby)
roomName: the name of the room
userName: the name of the ownser
owner: the iwner
userID: the id of the user
houses: all the houses
*/
// Needs editing when making the home page
const makeRoom = ({
  houseID,
  RoomName,
  userName,
  owner,
  userID,
  houses,
  type,
}) => {
  // Makes it
  houses[houseID] = {
    name: { RoomName },
    users: {},
    names: {},
    owner: "",
    messages: [1],
    type: type,
  };
  return houses;
};

// exports all funcs
module.exports = { addUser, removeUser, makeRoom };
