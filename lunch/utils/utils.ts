/*
	Update user list
	----
	socket: the socket var
	roomDB: the db
	room: the room id
*/
const updateUserList = ({socket, RoomDB, room}) => {
	
	// Makes a list
	let userList = [];
	
	// Finds the room
	RoomDB.findById(room)
    	.catch(() => console.log("error"))
    	.then((result) => {

			// Deletes the filler
			delete result.users.null

			// Loops though all the users
			for (let user in result.users){

				// Adds them to the list
				userList.push({name: result.users[user].name, id: result.users[user].id})
			}
			
			// Emits then to the list
			socket.emit('user list', userList)
			socket.to(room).emit('user list', userList)
		})
	
}

// Exports the func updateUserList
module.exports = { updateUserList };