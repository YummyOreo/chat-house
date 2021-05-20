
// Imports all needed imports
var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ-');
let express = require("express");
let socketio = require("socket.io");
let http = require("http");
let superagent = require('superagent');
var github = require('octonode');
//let cors = require('cors')
let mongoose = require("mongoose")

// inits envs
require('dotenv').config()

// Imports the db models
let Users = require('./models/user')
let RoomDB = require('./models/room')

// Sets the envs
let url = process.env.URL
let ID = process.env.ID
let SECRET = process.env.SECRET

// Imports all utils
let { addUser, removeUser, makeRoom } = require("./utils/users");
let { updateUserList } = require("./utils/utils");

// Sets global vars
let home = 'home'

let PORT = process.env.PORT || 5000;

// gets the router
let router = require("./router/router");

//Setups the server
let app = express();
let server = http.createServer(app);
let io = socketio(server);

// Uses the router
app.use(router);
//app.use(cors());

// Connects to the db
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log("Connected to db")

		// Makes the server
		server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

	})
	.catch((err) => {
		console.log(err)
	})

// Makes the messages ID
function checkMessageId(messages) {
  //Gest the heighest number in the room
  let max = Math.max(...messages);
  max += 1; // adds one
  return max;
}

// When A user connects
io.on("connection", (socket) => {
	
	// sets private  vars
	let slowmode = 0;
	let soketRoom;

	/*
		Join Room
		----
		token: the user token
		id: the id of the room
		---
		callback
		---
		roomname: the name of the room
		owner: if they are the owner
		type: the tyoe of the room
		name: the user name
		slowmode: the slowmode of the room
	*/
	socket.on("join", ({ token, id: room }, callback) => {

		// Saves the room var in the private vars
		soketRoom = room;

		// gets the room from the db
		RoomDB.findById(room)
			.catch((err) => console.log(err))
			.then((result) => {

				// If the room does not exist
				if (result === undefined || result === null) {
					// returns saying it does not exist
					callback({
						roomname: undefined,
						owner: undefined,
						type: undefined,
						name: undefined,
						slowmode: undefined
					});
					return;
				}

				// Finds the user
				Users.findById(token, function (err, docs) {
					if (err){
						console.log(err);
					}
					else {
						
						// Saves the name
						let name = docs.name

						// Adds the user to the room
						addUser({ socketID: socket.id, userName: name, roomID: room, RoomDB, token, id: docs.id });
						
						// joins the room in socket
						socket.join(room);

						// Updates the user list on the right of the client
						updateUserList({socket, RoomDB, room})

						// Finds the room again
						RoomDB.findById(room)
							.catch(err => console.log(err))
							.then(res => {

								// Gets the new ID
								let id = checkMessageId(res.messages);

								// Adds the room id
								RoomDB.findByIdAndUpdate(room, {"messages": [...res.messages, id]})
									.catch(err => console.log(err))

								// Sends the messages
								socket.emit("message", 
									"System",
									`@${name} has joined the room!`,
									id,
								);
								socket.to(room).emit("message", 
									"System",
									`@${name} has joined the room!`,
									id,
								);

								// Returns the vars
								if (res.owner === token) {
									callback({
										roomname: res.name,
										owner: true,
										type: res.type,
										name
									});
								} else {
									callback({
										roomname: res.name,
										owner: false,
										type: res.type,
										name,
										slowmode: res.slowmode
									});
								}
							})
					}
				});

			})

	});

	/*
		Sending messages
		----
		name: the name of the user
		room: the room id
		message: the message content
	*/
	socket.on("send message", (name, room, message) => {
		
		// checks if the messages has not content
		if (message == null || message == '' || message == undefined) {
			socket.emit("toast", "You can not send nothing!", 'error')
			return
		}

		// Finds the room
		RoomDB.findById(room)
				.catch(err => console.log(err))
				.then(res => {

					// Checks if the the user has sent the message before the slowmode it done
					if (slowmode != 0){
						socket.emit("toast", "There was a error sending that message", 'error')
						return;
					}

					// Gets a new message ID
					let id = checkMessageId(res.messages);

					// Adds the room id
					RoomDB.findByIdAndUpdate(room, {"messages": [...res.messages, id]})
						.catch(err => {console.log(err); 
							socket.emit("toast", "There was a error sending that message", 'error') 
							return
						})
						.then(res => {

							// Emits the message
							socket.emit("message", name, message, id );
							socket.to(room).emit("message", name, message, id );

							// Changes the slowmode to 0
							slowmode = 0

							// Wait for SLOWMODE then changes to SLOWMODE
							setTimeout(() => {  slowmode = res.slowmode; }, res.slowmode * 100);

						})
					
				});
	});

	/*
		When a user disconnects
		----
		none -_-
	*/
	socket.on("disconnect", () => {

		// Gets the room
		let room = soketRoom;

		if (room == home || room == undefined) return;

		// Leaves the room
		socket.leave(room)

		// Sets the token var
		let token;

		// Finds the room
		RoomDB.findById(room)
			.catch(err => console.log('err'))
			.then(res => {

				// Loops though users
				for (let user in res.users) {
					
					// Checks if the user has the same Socket ID
					if (res.users[user].socket == socket.id) {
						
						// Sets the token
						token = user

						// Return
						return;
					}
				}
			})

		// Removes the user
		removeUser({roomID: room, RoomDB, token: token });
		// Updates the list
		updateUserList({ socket, RoomDB, room: room, Users });
	});

	
	socket.on('kick', (id, token, room) => {
		RoomDB.findById(room)
			.catch(err => console.log(err))
			.then(res => {
				if (res.owner === token) {

					// Finds the socket id of the user
					let user
					for (user in res.users) {
						if (res.users[user].id = id) {

							// Emits to kick them
							socket.to(res.socket).emit('kicked', id)

							// Finds the user
							Users.find({id: id})
							.then((result) => {

								// Checks if the user does not exist
								if (result.name == undefined){
									socket.emit("toast", "There was a error kicking that user", 'error')
									return
								}

								// Emits a toast saying they have been kicked
								socket.emit("toast", `${result.name} has been kicked`, 'success')
							})
							.catch(err => socket.emit("toast", "There was a error kicking that user", 'error'))
						}
					}
					
				}
			})
		
	})

	/*
		Join Home
		--
		For emiting room updates (live room updates)
		---
		callback
		---
		retrunRoom: all of the rooms
	*/
	socket.on('join home', (callback) => {

		// Sets the room
		soketRoom = home;

		// Joins the room
		socket.join(home)

		// Sets the vars
		let returnRoom = {}

		// Finds all rooms
		RoomDB.find()
			.catch(err => console.log('err'))
			.then(res => {

				// Gets thier id
				for (let id in res){

					// Adds it to the var
					returnRoom[res[id]._id] = res[id].name
				}

				// Returns it
				callback(returnRoom);
			})
	})
	
	/*
		Making a new room
		----
		name: the name of the new room
		type: the type of the new room
		token: the token of the user
		---
		callback
		---
		roomID: the id of the room
	*/
	socket.on("new room", (name, type, token, callback) => {

		// Sets vars
		let returnRoom = {}

		// Finds all rooms
		RoomDB.find()
			.catch(err => console.log(err))

			.then(res => {
				
				// Sets rooms
				let Rooms = res[0]

				// Gets the new id
				let roomID = makeID(Rooms)

				// Makes the room
				makeRoom({ 
					RoomName: name,
					RoomDB,
					type,
					roomID,
					token
				})

				// Adds the new romo to the var
				returnRoom[roomID] = name

				// loops though all rooms
				for (let id in res[0]){

					// Adds it to the var
					returnRoom[res[id]._id] = res[id].name
				}

				// Emits the new room/All rooms
				socket.to(home).emit("room update", returnRoom)
				socket.emit("room update", returnRoom)

				// retruns the id
				callback(roomID)
			})
		
	})

	/*
		Make/Loggin To a Account
		---
		Code: the code to get the accece token
		--
		callback
		---
		token: the user token
		id: the user id
	*/
	socket.on("Make Account", (code, callback) => {
		
		// TOO HARD TO EXPLAIN
		superagent
		.post('https://github.com/login/oauth/access_token')
		.send({ 
			client_id: ID, 
			client_secret: SECRET,
			code: code
		})
		.set('Accept', 'application/json')
		.end((err, data) => {
			let newData = data.body;
			console.log(newData)
			var client = github.client(newData.access_token);

			client.get('/user', {}, function (err, status, body, headers) {
				console.log(body); 

				Users.find({id: body.id}, function (err, docs) {
					if (docs.length){
						console.log(docs[0])
						console.log(docs[0]._id, docs[0].id)
						callback(docs[0]._id, docs[0].id)
					} else {
						let user = new Users({
							id: body.id,
							githubToken: newData.access_token,
							name: body.login,
							rooms: [],
							owned: [],
							banned: []
						});
						user.save()
						.then((result) => {
							console.log(result)
							let token = result._id
							let id = result.id
							console.log(token)
							callback(token, id)
						})
					}
				})

				
			});

		});
	})

});

// Makes id
function makeID(Rooms) {

	// Makes the id
	let id = randomToken(35);

	if (Rooms == undefined) return id

	// Checks if its not taken
	if (Rooms[id] != null){
		
		// Recursive
		id = makeID(Rooms)
	} else {
		return id
	}
}
