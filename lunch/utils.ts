const updateUserList = ({socket, rooms, room}) => {
	let userList = [];
	for (let user in rooms[room].users){
		userList.push(rooms[room].users[user])
	}
	socket.emit('user list', userList)
	socket.to(rooms[room]).emit('user list', userList)
}

module.exports = { updateUserList };