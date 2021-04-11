import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import NavBar from './NavBar.js'
import Input from './input.js'
import Messages from './Messages.js'

import "../main.css";

let socket;

var connectionOptions =  {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity", 
			"timeout" : 10000,                  
			"transports" : ["websocket"]
};

const Chat = ({ location }) => {

	function promptNameFunc(socket, room) {
		let tryName = prompt('Whats your name');		
		socket.emit('check name', tryName, room, (results) => {
			if (results == true){
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

	let [messages, setMessages] = useState({ 1: {name: "System", message: "This is the start of the chat"}});
	let [message, setMessage] = useState([]);

	let [systems] = useState([]);

	let [roomName, setRoomName] = useState('');

	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		const { room } = queryString.parse(location.search);

		socket = io(ENDPOINT, connectionOptions);
		setTimeout(() => { 
			let promptName
			promptName = promptNameFunc(socket, room);

			console.log(promptName)

			setName(promptName);

			setRoom(room);

			socket.emit('join', { name: promptName, room }, ({ roomname }) => {
				setRoomName(roomname);
			});
			console.log(roomName)

		 }, 100);
		


		return () => {
			socket.emit("disconnect", room);

			socket.off();
		}
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', ({ name, sendMessage, id }) => {
			console.log(name)
			messages[id] = {name, message: sendMessage};
			console.log(messages);
		});
	}, [messages]);

	const sendMessage = (event) => {
		event.preventDefault();

		if(message) {
			socket.emit('send message', name, room, message, () => setMessage(''));
		}

	}

	return (
		<div>
		<div style={{"zIndex": 10}}>
			<NavBar roomName={roomName} />
		</div>	
				<br/>
				<br/>
				<div>
				</div>
			<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '#292929', height: 'max', minHeight: "96vh"}}>
				<div className='container' style={{marginTop: 0}}>
				<div>
					<br/>
					<div style={{with: "10px"}}>
						<Messages messages={messages} />
					</div>
					<br/>
					<br/>
						<Input message={message} setMessage={setMessage} sendMessage={sendMessage} style={{position: "fixed"}}/>
					<br/>
				</div>

				</div>
				<div style={{backgroundColor: "gray", width: 'max', height: 'max', minHeight: "96vh", color: "white"}}>
				<p>Test</p>
				</div>
			</div>
			
		</div>
	)
}

export default Chat;
