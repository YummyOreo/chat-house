// Updates the user list
/*
socket: the socket of the user
rooms: all the rooms
room: the room id of the room -_-
*/
const updateUserList = ({socket, rooms, room}) => {
	// Makes a list
	let userList = [];
	// loops all the users and adds it to the list
	for (let user in rooms[room].users){
		userList.push(rooms[room].users[user])
	}
	// Emits the list
	socket.emit('user list', userList)
	socket.to(rooms[room]).emit('user list', userList)
}

// Exports the func updateUserList
module.exports = { updateUserList };