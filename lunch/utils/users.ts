
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
let addUser = ({ socketID, userName, roomID, RoomDB, token, id }) => {
	// If the name is null, undefined, or '' it sets it to Guest
	console.log('W')
	/*
		userName = userName.trim()
		roomID = roomID.trim()
		*/

	//rooms[id] = { name: { RoomName }, users: { socketID: userName }, names: { userName: socketID }, owner: owner };
	// Adds to the user list
	RoomDB.findById(roomID)
		.catch(() => console.log("error"))
		.then((result) => {
			delete result.users["null"]
			let users = {...result.users, [token]: {name: userName, id: id, socket: socketID}}
			RoomDB.findByIdAndUpdate(roomID, {"users": users})
				.then(result => console.log(result))
				.catch(() => console.log("error"))
		})
	return RoomDB


};
// removes a user for the room
/*
userID: the id of the user
userName: the name of the user
roomID: the id of the room
rooms: all the rooms
*/
let removeUser = ({roomID, RoomDB, token }) => {
	// deletes the user from the room
	RoomDB.findById(roomID)
		.catch(() => console.log("error"))
		.then((result) => {
			let users = result.users
			delete users.token
			RoomDB.findByIdAndUpdate(roomID, {"users": users})
				.then(result => console.log(result))
				.catch(() => console.log("error"))
		})
	return RoomDB

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
  RoomDB,
  type,
  roomID,
  token
}) => {

	let room = new RoomDB({
		_id: roomID,
		name: RoomName,
		users: {null: null},
		owner: token,
		messages: [1],
		type: "chat",
		slowmode: 1
	});
	room.save()
	.then((result) => {
		console.log(result)
	})
	return RoomDB

};

// exports all funcs
module.exports = { addUser, removeUser, makeRoom };
