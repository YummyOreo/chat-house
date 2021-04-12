//const rooms = {};
// rooms = { id: {name: '', users: {}, names: {}, owner: '', messages: [] }
const addUser = ({ userID, userName, roomID, rooms }) => {
    if (userName == null || userName == undefined || userName == '')
        userName = 'Guest';
    userName = userName.trim();
    roomID = roomID.trim();
    //rooms[id] = { name: { RoomName }, users: { userID: userName }, names: { userName: userID }, owner: owner };
    rooms[roomID].users[userID] = userName;
    rooms[roomID].names[userName] = userID;
    return rooms;
};
const removeUser = ({ userID, userName, roomID, rooms }) => {
    delete rooms[roomID].users[userID];
    delete rooms[roomID].names[userName];
    if (userID == rooms[roomID].owner) {
        delete rooms[roomID].owner;
    }
    return rooms;
};
const makeRoom = ({ roomID, RoomName, userName, owner, userID, rooms }) => {
    rooms[id] = { name: { RoomName }, users: { userID: userName }, names: { userName: userID }, owner: owner, messages: [1] };
    return rooms;
};
module.exports = { addUser, removeUser, makeRoom };
