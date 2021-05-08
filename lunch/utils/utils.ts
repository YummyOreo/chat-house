// Updates the user list
/*
socket: the socket of the user
rooms: all the rooms
room: the room id of the room -_-
*/
const updateUserList = ({socket, RoomDB, room}) => {
	// Makes a list
	let userList = [];
	RoomDB.findById(room)
    .catch(() => console.log("error"))
    .then((result) => {
		console.log(result)
		for (let user in result.users){
			userList.push({name: result.users[user].name, id: result.users[user].id})
		}
		// loops all the users and adds it to the list
		// Emits the list
		console.log(userList)
		socket.emit('user list', userList)
		socket.to(room).emit('user list', userList)
	})
	
}

// Exports the func updateUserList
module.exports = { updateUserList };