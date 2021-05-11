var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ-');
let express = require("express");
let socketio = require("socket.io");
let http = require("http");
let superagent = require('superagent');
var github = require('octonode');
//let cors = require('cors')
// Sets up the db
let mongoose = require("mongoose")
require('dotenv').config()

let Users = require('./models/user')
let RoomDB = require('./models/room')

let url = process.env.URL
let ID = process.env.ID
let SECRET = process.env.SECRET

// All utils
let { addUser, removeUser, makeRoom } = require("./utils/users");
let { updateUserList } = require("./utils/utils");

let rooms = {
};

let home = 'home'

let PORT = process.env.PORT || 5000;

//setupts the router
let router = require("./router/router");

//Setups the server
let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(router);
//app.use(cors());

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log("Connected to db")
		//Setsupt the port
		server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

	})
	.catch((err) => {
		console.log(err)
	})

//Give the message a ID
function checkMessageId(messages) {
  //Gest the heighest number in the room
  let max = Math.max(...messages);
  max += 1; // adds one
  return max;
}

// When A user connects **not joins**
io.on("connection", (socket) => {
	let soketRoom;
  // When the user joins
  /*
	name: the name of the user
	room: the room id of the room
	*/
  socket.on("join", ({ token, id: room }, callback) => {
	// Adds the user to to room
	soketRoom = room;
	RoomDB.findById(room)
		.catch(() => console.log("error"))
		.then((result) => {
			console.log(result)
			if (result === undefined || result === null) {
				callback({
					roomname: undefined,
					owner: undefined,
					type: undefined,
					name: undefined
				});
				return;
			}
			Users.findById(token, function (err, docs) {
				if (err){
					console.log(err);
				}
				else{
				  let name = docs.name
				  addUser({ socketID: socket.id, userName: name, roomID: room, RoomDB, token, id: docs.id });
				  /*
				  console.log(rooms[room].name)
			  
				  console.log(rooms)
				  */
				  // joins the room
				  socket.join(room);
				  // Updates the user list on the left of the client
				  updateUserList({socket, RoomDB, room})
				  // Makes the id for the join message
				  RoomDB.findById(room)
					  .catch(err => console.log(err))
					  .then(res => {
						  let id = checkMessageId(res.messages);
						  // Sends the message
						  RoomDB.findByIdAndUpdate(room, {"messages": [...res.messages, id]})
						  .catch(err => console.log(err))
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
								  name
							  });
						  }
					  })
		  
				}
			});

		})


	

  });
  //For sending a message (Every messasge even join and leave)
  /*
	name: the name of a sender
	room: the room id
	message: the content of the messsage
	*/
  socket.on("send message", (name, room, message) => {
	
	if (message == null || message == '' || message == undefined) {
		socket.emit("toast", "You can not send nothing!", 'error')
		return
	}

	try{
		if (message.startsWith("!")) {
		let [command, ...args] = message
			.trim()
			.substring("!".length)
			.split(/\s+/);
		}
	} catch {(err: any) => {
		console.log(err)
		socket.emit("toast", "There was a error sending that message", 'error')
	}}
	RoomDB.findById(room)
			.catch(err => console.log(err))
			.then(res => {
			// Gets the ID of the message
			let id = checkMessageId(res.messages);

			// Emits the message to the room
			RoomDB.findByIdAndUpdate(room, {"messages": [...res.messages, id]})
				.catch(err => {console.log(err); 
					socket.emit("toast", "There was a error sending that message", 'error') 
					return
				})
				.then(res => {
					socket.emit("message", name, message, id );
					socket.to(room).emit("message", name, message, id );
				})
				
		});
	});
  // When a user disconnects
  /*
	None
	*/
  socket.on("disconnect", () => {
	// Gets the room of the user
	
	let room = soketRoom

	socket.leave(room)

	console.log(room)

	if (room == home) return;

	let token;

	RoomDB.findById(room)
		.catch(err => console.log('err'))
		.then(res => {
			for (let user in res.users) {
				if (res.users[user].socket == socket.id) {
					token = user
					return;
				}
			}
		})

	// Removes the user
	rooms = removeUser({roomID: room, RoomDB, token: token });
	// Updates the list
	updateUserList({ socket, RoomDB, room: room, Users });
  });

  socket.on('kick', (id, token, room) => {
	RoomDB.findById(room)
		.catch(err => console.log(err))
		.then(res => {
			if (res.owner === token) {
				socket.to(room).emit('kicked', id)
				Users.find({id: id})
				.then((result) => {
					console.log(result)
					if (result.name == undefined){
						socket.emit("toast", "There was a error kicking that user", 'error')
						return
					}
					socket.emit("toast", `${result.name} has been kicked`, 'success')
				})
				.catch(err => socket.emit("toast", "There was a error kicking that user", 'error'))
			}
		})
	
  })

  socket.on('join home', (callback) => {
	soketRoom = home;
	socket.join(home)
	let returnRoom = {}
	RoomDB.find()
		.catch(err => console.log('err'))
		.then(res => {
			for (let id in res){
				console.log(res[id])
				returnRoom[res[id]._id] = res[id].name
				console.log(returnRoom)
			}
			callback(returnRoom);
		})
  })
  
  socket.on("new room", (name, type, token, callback) => {
	let id: any
	
	let returnRoom = {}
	RoomDB.find()
		.catch(err => console.log(err))
		.then(res => {
			console.log(res[0])
			let Rooms = res[0]
			let roomID = makeID(Rooms)
			console.log(name)
			rooms = makeRoom({ 
				RoomName: name,
				RoomDB,
				type,
				roomID,
				token
			})
			returnRoom[roomID] = name
			for (let id in res[0]){
				console.log(id)
				returnRoom[res[id]._id] = res[id].name
				console.log(returnRoom)
			}
			socket.to(home).emit("room update", returnRoom)
			socket.emit("room update", returnRoom)
			callback(roomID)
		})
	
  })



  socket.on("Make Account", (code, callback) => {

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

function makeID(Rooms) {
	let id = randomToken(35);
	if (Rooms == undefined) return id
	console.log(Rooms)
	if (Rooms[id] != null){
		id = makeID(Rooms)
	} else {
		return id
	}
}
