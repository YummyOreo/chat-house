import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import NavBar from './navBar/NavBar'
import Input from './input/input'
import Messages from './messages/Messages'
import UserBar from './userBar/userBar'

import "../main.css";

let socket: any;

var connectionOptions: any =  {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity", 
			"timeout" : 10000,                  
			"transports" : ["websocket"]
};

const Chat = ({ location }: {location:any}) => {

	function promptNameFunc(socket: any, room: any) {
		console.log(socket)
		let tryName = prompt('Whats your name');		
		socket.emit('check name', tryName, room, (result: any) => {
			if (result == true){
				promptNameFunc(socket, room)
			} else {
				console.log(tryName)
				return tryName
			}
		})
		return tryName

	}

	let [name, setName] = useState('');
	let [room, setRoom] = useState('');

	let [users, setUsers] = useState(['']);

	let [messages, setMessages] = useState({ 1: {name: "System", message: "This is the start of the chat", mention: true}});
	let [message, setMessage] = useState([]);

	let [systems] = useState([]);

	let [roomName, setRoomName] = useState('');

	let [newName, setNewName] = useState('');

	let [owner, setOwner] = useState(false);
	let [ownerID, setOwnerID] = useState('');

	let [type, setType] = useState('');

	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		const {room}: any = queryString.parse(location.search);

		socket = io(ENDPOINT, connectionOptions);
		setTimeout(() => { 
			let promptName: string | null;
			promptName = promptNameFunc(socket, room);
			if (promptName == null) promptName = 'Guest'
			console.log(promptName)

			setName(promptName);

			setRoom(room);

			socket.emit('join', { name: promptName, room }, ({ roomname, ownerID, owner, type }: any) => {
				setRoomName(roomname);
				setType(type)
				console.log(users)
				if (ownerID && owner == true){
					setOwner(true)
					setOwnerID(ownerID)
				}
			});
			console.log(roomName)

		 }, 100);


		return () => {
			socket.emit("disconnect", room);

			socket.off();
		}
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('kicked', (id: any) => {
			console.log('Kicked')
			console.log(socket.id)
			//socket.emit("disconnect", room);
			//socket.off();
			window.location.href = '/'
		})
	})

	useEffect(() => {
		//all messages
		socket.on('message', ({ nameSend, sendMessage, id }: {nameSend:any, sendMessage:any, id:any}) => {
			//console.log(name)
			//messages[id] = {name, message: sendMessage};
			let idValue = id
			let mention = false
			if (sendMessage.includes(`@${name}`)){ mention = true}
			setMessages({...messages, [idValue]: {name: nameSend, message: sendMessage, mention}})
			console.log(messages)
		});
	}, [messages]);

	useEffect(() => {
		socket.on("user list", (userList: any) => {
			setUsers(userList)
		})
	}, [users])
	
	function changeNameEmit(newName: any) {
		socket.emit("name change", newName, room)
	}

	const sendMessage = (event: any) => {
		event.preventDefault();

		if(message) {
			socket.emit('send message', name, room, message);
		}

	}

	const changeName = () => {
		console.log(socket)
		let testName: any = prompt('Whats your name');	
		if (testName == null || testName == ''){
			changeName()
		}

		if (users.includes(testName) && testName != null){
			changeName()
		} else {
			setNewName(testName)
			changeNameEmit(testName)
		}
	}

	return (
		<div>
		<div style={{"zIndex": 10}}>
			<NavBar roomName={roomName} changeName={changeName}/>
		</div>	
				<br/>
				<br/>
				<div>
				</div>
			<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '#292929', height: 'max', minHeight: "95vh"}}>
				<div className='container' style={{marginTop: 0}}>
				<div>
					<br/>
					<div style={{width: "10px"}}>
						<Messages messages={messages} />
					</div>
					<br/>
					<br/>
						<Input message={message} setMessage={setMessage} sendMessage={sendMessage} type={type} owner={owner}/>
					<br/>
				</div>

				</div>
				<div style={{backgroundColor: "gray", width: 'max', height: 'max', minHeight: "95vh", color: "white"}}>
					<UserBar users={users}/>
				</div>
			</div>
			
		</div>
	)
}

export default Chat;
