// Updates the user list
/*
socket: the socket of the user
rooms: all the rooms
room: the room id of the room -_-
*/
let updateUserList = ({socket, rooms, room, Users}) => {
	// Makes a list
	let userList = [];
	// loops all the users and adds it to the list
	for (let user in rooms[room].names){
		userList.push(rooms[room].names[user])

	}
	// Emits the list
	console.log(userList)
	socket.emit('user list', userList)
	socket.to(rooms[room]).emit('user list', userList)
	
}

// Exports the func updateUserList
module.exports = { updateUserList };