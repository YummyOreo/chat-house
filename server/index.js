const express = require('express');
const socketio = require('socket.io');
const http = require('http');
//const cors = require('cors')
const { addUser, removeUser, makeRoom } = require('./users');
let rooms = { 'test': { name: "test", users: {}, names: {}, owner: 'owner', messages: [1] } };
const PORT = process.env.PORT || 5000;
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);
//app.use(cors());
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
function checkMessageId(room) {
    let max = Math.max(...rooms[room].messages);
    max += 1;
    return max;
}
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        rooms = addUser({ userID: socket.id, userName: name, roomID: room, rooms });
        console.log(rooms[room].name);
        console.log(rooms);
        socket.join(rooms[room]);
        let id = checkMessageId(room);
        rooms[room].messages.push(id);
        socket.emit('message', { name: 'System', sendMessage: `${name} has joined the room!`, id });
        socket.to(rooms[room]).emit('message', { name: 'System', sendMessage: `${name} has joined the room!`, id });
        callback({ roomname: rooms[room].name });
    });
    socket.on('send message', (name, room, message, callback) => {
        console.log(message);
        let id = checkMessageId(room);
        rooms[room].messages.push(id);
        socket.emit('message', { name, sendMessage: message, id });
        socket.to(rooms[room]).emit('message', { name, sendMessage: message, id });
        callback();
    });
    socket.on('check name', (name, room, callback) => {
        if (rooms[room].names[name] != null) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
    socket.on('disconnect', () => {
        room = getUsersRooms(socket, rooms);
        console.log(room);
        if (room == undefined)
            return;
        let id = checkMessageId(room);
        rooms[room].messages.push(id);
        socket.to(rooms[room]).emit('message', { name: 'System', sendMessage: `${rooms[room].users[socket.id]} has left.`, id });
        rooms = removeUser({ userID: socket.id, userName: rooms[room].users[socket.id], roomID: room, rooms });
    });
});
function getUsersRooms(socket, rooms) {
    for (room in rooms) {
        if (rooms[room].users[socket.id] != null)
            return room;
    }
}
