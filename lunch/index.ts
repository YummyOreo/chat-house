const express = require("express");
const socketio = require("socket.io");
const http = require("http");
//const cors = require('cors')

// All utils
const { addUser, removeUser, makeRoom } = require("./utils/users");
const { updateUserList } = require("./utils/utils");
let rooms = {
  test: {
    name: "test",
    users: {},
    names: {},
    owner: "owner",
    messages: [1],
    ownerID: 1,
  },
};

const PORT = process.env.PORT || 5000;

//setupts the router
const router = require("./router/router");

//Setups the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
//app.use(cors());

//Setsupt the port
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

//Give the message a ID
function checkMessageId(room) {
  //Gest the heighest number in the room
  let max = Math.max(...rooms[room].messages);
  max += 1; // adds one
  return max;
}

// When A user connects **not joins**
io.on("connection", (socket) => {
  // When the user joins
  /*
	name: the name of the user
	room: the room id of the room
	*/
  socket.on("join", ({ name, room }, callback) => {
    // Adds the user to to room
    rooms = addUser({ userID: socket.id, userName: name, roomID: room, rooms });
    /*
		console.log(rooms[room].name)

		console.log(rooms)
		*/
    // joins the room
    socket.join(rooms[room]);
    // Updates the user list on the left of the client
    updateUserList({ socket, rooms, room });
    // Makes the id for the join message
    let id = checkMessageId(room);
    // Sends the message
    rooms[room].messages.push(id);
    socket.emit("message", {
      name: "System",
      sendMessage: `${name} has joined the room!`,
      id,
    });
    socket.to(rooms[room]).emit("message", {
      name: "System",
      sendMessage: `${name} has joined the room!`,
      id,
    });
    /*
		let user: any;
		let userList: any = [];
		for (user in rooms[room].users){
			console.log(rooms[room].users)
			console.log(user)
			userList.push(rooms[room].users[user])
		}
		console.log(userList)
		*/
    if (rooms[room].owner === socket.id) {
      callback({
        roomname: rooms[room].name,
        ownerID: rooms[room].ownerID,
        owner: true,
      });
    } else {
      callback({ roomname: rooms[room].name, ownerID: false, owner: false });
    }
  });
  //For sending a message (Every messasge even join and leave)
  /*
	name: the name of a sender
	room: the room id
	message: the content of the messsage
	*/
  socket.on("send message", (name, room, message) => {
    if (message.startsWith("!")) {
      const [command, ...args] = message
        .trim()
        .substring("!".length)
        .split(/\s+/);
      if (command === "kick") {
        console.log("YAY");
        let kickName = args.slice(0).join(" ");
        console.log(kickName);
        kickName = kickName.trim();
        console.log(kickName);
        if (rooms[room].names[kickName] != null) {
          let id = rooms[room].names[kickName];
          socket.to(id).emit("kick");
          console.log(id);
          console.log(socket.id);
          return;
        }
      }
    }
    // Gets the ID of the message
    let id = checkMessageId(room);

    // Emits the message to the room
    rooms[room].messages.push(id);

    socket.emit("message", { name, sendMessage: message, id });
    socket.to(rooms[room]).emit("message", { name, sendMessage: message, id });
  });
  // Checks the name of the user **When they join**
  /*
	name: The name of the user (Not final)
	room: the id of the room
	callback: sending the message back
	*/
  socket.on("check name", (name, room, callback) => {
    // Checks if the name DOES NOT EXIST :smart:
    if (rooms[room].names[name] != null) {
      //Calls it back true
      callback(true);
    } else {
      //Calls it back false
      callback(false);
    }
  });
  // WHen a user want to chnage there name
  /*
	newName: the new name of the user
	room: the id of the room
	*/
  socket.on("name change", (newName, room) => {
    //Gets the old name
    const oldName = rooms[room].users[socket.id];
    // Changes the name in the ID sorted to the new name
    rooms[room].users[socket.id] = newName;
    // Deletes the name in the name sorted
    delete rooms[room].name[oldName];
    // Makes a new one
    rooms[room].name[newName] = socket.id;
    // Updates the user list
    updateUserList({ socket, rooms, room });
  });
  // When a user disconnects
  /*
	None
	*/
  socket.on("disconnect", () => {
    // Gets the room of the user
    let room = getUsersRooms(socket, rooms);
    // if there not in a room, do nothing
    if (room == undefined) return;
    // make a messgae
    let id = checkMessageId(room);
    //sends the message
    rooms[room].messages.push(id);
    socket.to(rooms[room]).emit("message", {
      name: "System",
      sendMessage: `${rooms[room].users[socket.id]} has left.`,
      id,
    });
    // Removes the user
    rooms = removeUser({
      userID: socket.id,
      userName: rooms[room].users[socket.id],
      roomID: room,
      rooms,
    });
    // Updates the list
    updateUserList({ socket, rooms, room });
  });
});

function getUsersRooms(socket, rooms) {
  // Loops all the rooms and checks if the user is there
  let room;
  for (room in rooms) {
    if (rooms[room].users[socket.id] != null) return room; // returns the room id
  }
}
