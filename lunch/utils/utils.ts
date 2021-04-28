// Updates the user list
/*
socket: the socket of the user
rooms: all the rooms
room: the room id of the room -_-
*/
const updateUserList = ({socket, rooms, room, Users}) => {
	// Makes a list
	let userList = [];
	// loops all the users and adds it to the list
	for (let user in rooms[room].users){
		console.log(user)
		console.log(rooms[room].users)
		Users.findById(rooms[room].users[user], function (err, docs) {
			if (err){
				console.log(err);
			}
			else{
				console.log(docs)
				const name = docs.name
				userList.push(name)
			}
		})
	}
	// Emits the list
	console.log(userList)
	socket.emit('user list', userList)
	socket.to(rooms[room]).emit('user list', userList)
	
}

// Exports the func updateUserList
module.exports = { updateUserList };