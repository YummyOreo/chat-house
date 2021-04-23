const express = require("express");
const socketio = require("socket.io");
const http = require("http");
//const cors = require('cors')

// All utils
const { addUser, removeUser, makehouse } = require("./utils/users");
const { updateUserList } = require("./utils/utils");
let houses = {
  test: {
    name: "test",
    users: {},
    names: {},
    owner: "",
    messages: [1],
    ownerID: 1,
    type: "announcement",
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
function checkMessageId(house) {
  //Gest the heighest number in the house
  let max = Math.max(...houses[house].messages);
  max += 1; // adds one
  return max;
}

// When A user connects **not joins**
io.on("connection", (socket) => {
  // When the user joins
  /*
	name: the name of the user
	house: the house id of the house
	*/
  socket.on("join", ({ name, house }, callback) => {
    // Adds the user to to house
    houses = addUser({ userID: socket.id, userName: name, houseID: house, houses });
    /*
		console.log(houses[house].name)

		console.log(houses)
		*/
    // joins the house
    socket.join(houses[house]);
    // Updates the user list on the left of the client
    updateUserList({ socket, houses, house });
    // Makes the id for the join message
    let id = checkMessageId(house);
    // Sends the message
    houses[house].messages.push(id);
    socket.emit("message", {
      name: "System",
      sendMessage: `@${name} has joined the house!`,
      id,
    });
    socket.to(houses[house]).emit("message", {
      name: "System",
      sendMessage: `@${name} has joined the house!`,
      id,
    });
    /*
		let user: any;
		let userList: any = [];
		for (user in houses[house].users){
			console.log(houses[house].users)
			console.log(user)
			userList.push(houses[house].users[user])
		}
		console.log(userList)
		*/
    if (houses[house].owner === socket.id) {
      callback({
        housename: houses[house].name,
        ownerID: houses[house].ownerID,
        owner: true,
        type: houses[house].type,
      });
    } else {
      callback({
        housename: houses[house].name,
        ownerID: false,
        owner: false,
        type: houses[house].type,
      });
    }
  });
  //For sending a message (Every messasge even join and leave)
  /*
	name: the name of a sender
	house: the house id
	message: the content of the messsage
	*/
  socket.on("send message", (name, house, message, ownerID) => {
    if (message.startsWith("!")) {
      const [command, ...args] = message
        .trim()
        .substring("!".length)
        .split(/\s+/);
      if (command === "kick") {
        if (houses[house].owner != socket.id || ownerID != houses[house].ownerID) {
          let sendId = checkMessageId(house);

          // Emits the message to the house
          houses[house].messages.push(sendId);

          socket.emit("message", {
            name: "System",
            sendMessage: `You do not have the permission to use this command!`,
            sendId,
          });
          return;
        }
        // Add owner check
        let kickName = args.slice(0).join(" ");
        kickName = kickName.trim();
        if (houses[house].names[kickName] != null) {
          let id = houses[house].names[kickName];
          socket.to(houses[house]).emit("kicked", id);
          console.log(id);
          console.log(socket.id);
          // Gets the ID of the message
          let sendId = checkMessageId(house);

          // Emits the message to the house
          houses[house].messages.push(sendId);

          socket.emit("message", {
            name: "System",
            sendMessage: `${kickName} has been kicked`,
            sendId,
          });
          return;
        }
      }
    }
    // Gets the ID of the message
    let id = checkMessageId(house);

    // Emits the message to the house
    houses[house].messages.push(id);

    socket.emit("message", { name, sendMessage: message, id });
    socket.to(houses[house]).emit("message", { name, sendMessage: message, id });
  });
  // Checks the name of the user **When they join**
  /*
	name: The name of the user (Not final)
	house: the id of the house
	callback: sending the message back
	*/
  socket.on("check name", (name, house, callback) => {
    // Checks if the name DOES NOT EXIST :smart:
    if (houses[house].names[name] != null) {
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
	house: the id of the house
	*/
  socket.on("name change", (newName, house) => {
    //Gets the old name
    const oldName = houses[house].users[socket.id];
    // Changes the name in the ID sorted to the new name
    houses[house].users[socket.id] = newName;
    // Deletes the name in the name sorted
    delete houses[house].name[oldName];
    // Makes a new one
    houses[house].name[newName] = socket.id;
    // Updates the user list
    updateUserList({ socket, houses, house });
  });
  // When a user disconnects
  /*
	None
	*/
  socket.on("disconnect", () => {
    // Gets the house of the user
    let house = getUsershouses(socket, houses);
    // if there not in a house, do nothing
    if (house == undefined) return;
    // make a messgae
    let id = checkMessageId(house);
    //sends the message
    houses[house].messages.push(id);
    socket.to(houses[house]).emit("message", {
      name: "System",
      sendMessage: `@${houses[house].users[socket.id]} has left.`,
      id,
    });
    // Removes the user
    houses = removeUser({
      userID: socket.id,
      userName: houses[house].users[socket.id],
      houseID: house,
      houses,
    });
    // Updates the list
    updateUserList({ socket, houses, house });
  });
});

function getUsershouses(socket, houses) {
  // Loops all the houses and checks if the user is there
  let house;
  for (house in houses) {
    if (houses[house].users[socket.id] != null) return house; // returns the house id
  }
}
