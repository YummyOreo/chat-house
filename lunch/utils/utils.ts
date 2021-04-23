// Updates the user list
/*
socket: the socket of the user
houses: all the houses
house: the house id of the house -_-
*/
const updateUserList = ({socket, houses, house}) => {
	// Makes a list
	let userList = [];
	// loops all the users and adds it to the list
	for (let user in houses[house].users){
		userList.push(houses[house].users[user])
	}
	// Emits the list
	socket.emit('user list', userList)
	socket.to(houses[house]).emit('user list', userList)
}

// Exports the func updateUserList
module.exports = { updateUserList };