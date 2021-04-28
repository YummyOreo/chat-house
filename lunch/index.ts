var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ');
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
//const cors = require('cors')
// Sets up the db
const mongoose = require("mongoose")
require('dotenv').config()

const Users = require('./models/user')

let url = process.env.URL

// All utils
const { addUser, removeUser, makeRoom } = require("./utils/users");
const { updateUserList } = require("./utils/utils");

let rooms = {
  test: {
    name: "test",
    users: {},
    token: {},
    owner: "",
    messages: [1],
    type: "announcement",
  },
};

const home = 'home'

const PORT = process.env.PORT || 5000;

//setupts the router
const router = require("./router/router");

//Setups the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
//app.use(cors());

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to db")
        //Setsupt the port
        server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

    })
    .catch((err) => {
        console.log(err)
    })

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
  socket.on("join", ({ token, id: room }, callback) => {
    // Adds the user to to room
    Users.findById(token, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
        const name = docs.name
        rooms = addUser({ userID: socket.id, userName: name, roomID: room, rooms, token });
        /*
        console.log(rooms[room].name)
    
        console.log(rooms)
        */
        // joins the room
        socket.join(rooms[room]);
        // Updates the user list on the left of the client
        updateUserList({ socket, rooms, room, Users });
        // Makes the id for the join message
        let id = checkMessageId(room);
        // Sends the message
        rooms[room].messages.push(id);
        socket.emit("message", 
          "System",
          `@${name} has joined the room!`,
          id,
        );
        socket.to(rooms[room]).emit("message", 
          "System",
          `@${name} has joined the room!`,
          id,
        );
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
        if (rooms[room].owner === token) {
          callback({
            roomname: rooms[room].name,
            owner: true,
            type: rooms[room].type,
            name
          });
        } else {
          callback({
            roomname: rooms[room].name,
            owner: false,
            type: rooms[room].type,
            name
          });
        }
      }
  });

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
    }
    // Gets the ID of the message
    let id = checkMessageId(room);

    // Emits the message to the room
    rooms[room].messages.push(id);
    console.log(name)
    socket.emit("message", name, message, id );
    socket.to(rooms[room]).emit("message", name, message, id );
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
    socket.to(rooms[room]).emit("message", 
      "System",
      `@${rooms[room].users[socket.id]} has left.`,
      id,
    );
    // Removes the user
    rooms = removeUser({
      userID: socket.id,
      userName: rooms[room].users[socket.id],
      roomID: room,
      rooms,
    });
    // Updates the list
    updateUserList({ socket, rooms, room, Users });
  });

  socket.on('join home', (callback) => {
    socket.join(home)
    let returnRoom = {}
    for (let id in rooms){
      console.log(id)
      returnRoom[id] = rooms[id].name
      console.log(returnRoom)
    }
    callback(returnRoom);
  })
  
  socket.on("new room", (name, type, token, callback) => {
    let id: any
    var roomID = randomToken(5);
    rooms = makeRoom({ RoomName: name, rooms, type, roomID, token })
    console.log(rooms)
    let returnRoom = {}
    for (let room in rooms){
      returnRoom[room] = rooms[room].name
    }
    socket.to(home).emit("room update", returnRoom)
    socket.emit("room update", returnRoom)
    callback(roomID)
  })



  socket.on("Make Account", (name, email, callback) => {
    const id = makeID()

    const user = new Users({
        id: id,
        email: email,
        name: name,
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
        callback(token)
      })
  })

});

function makeID() {
  const id = Math.floor((Math.random() * 10000000000) + 1);
  Users.find({id: id}, function (err, docs) {
    if (docs.length){
      makeID()
    }
  })
  return id
}

function getUsersRooms(socket, rooms) {
  // Loops all the rooms and checks if the user is there
  let room;
  for (room in rooms) {
    if (rooms[room].users[socket.id] != null) return room; // returns the room id
  }
}
