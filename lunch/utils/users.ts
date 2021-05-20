
/*
	Add user to room
	----
	socketID: the socket id
	userName: the name of the user
	roomID: the id of the room
	RoomDB: the db
	token: the user token
	id: the id of the user
*/
let addUser = ({ socketID, userName, roomID, RoomDB, token, id }) => {

	// Finds the room
	RoomDB.findById(roomID)
		.catch((err) => console.log(err))
		.then((result) => {

			// Delets the filler iser
			delete result.users["null"]

			// Makes a new var and adds it to it
			let users = {...result.users, [token]: {name: userName, id: id, socket: socketID}}

			// Updates the new room 
			RoomDB.findByIdAndUpdate(roomID, {"users": users})
				.catch((err) => console.log(err))
		})
};

/*
	Removes a user from a room
	----
	roomID: the id of the room
	RoomDB: the db
	token: the token of the user
*/
let removeUser = ({roomID, RoomDB, token }) => {
	
	// Finds the room
	RoomDB.findById(roomID)
		.catch(() => console.log("error"))
		.then((result) => {

			// sets the var
			let users = result.users
			
			// Deletes the user
			delete users.token

			// Updates the room
			RoomDB.findByIdAndUpdate(roomID, {"users": users})
				.then(result => console.log(result))
				.catch(() => console.log("error"))
		})
};

/*
	Make Room
	----
	RoomName: The name of the room
	RoomDB: The db
	type: The type of the room
	roomID: the id of the room
	token: the user token
*/
let makeRoom = ({
  RoomName,
  RoomDB,
  type,
  roomID,
  token
}) => {

	// Makes a new docs
	let room = new RoomDB({
		_id: roomID,
		name: RoomName,
		users: {null: null},
		owner: token,
		messages: [1],
		type: "chat",
		slowmode: 1
	});

	// Saves the db
	room.save()
};

// exports all funcs
module.exports = { addUser, removeUser, makeRoom };
