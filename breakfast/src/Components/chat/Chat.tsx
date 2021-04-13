import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import NavBar from './NavBar.js'
import Input from './input.js'
import Messages from './Messages.js'

import "../main.css";

let socket: any = '';

var connectionOptions: any =  {
			"force new connection" : true,
			"reconnectionAttempts": "Infinity", 
			"timeout" : 10000,                  
			"transports" : ["websocket"]
};

const Chat = ({ location }: {location:any}) => {

	function promptNameFunc(socket: any, room: any) {
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

	let [messages, setMessages] = useState({ 1: {name: "System", message: "This is the start of the chat"}});
	let [message, setMessage] = useState([]);

	let [systems] = useState([]);

	let [roomName, setRoomName] = useState('');

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

			socket.emit('join', { name: promptName, room }, ({ roomname }: {roomname:any}) => {
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
		//all messages
		socket.on('message', ({ name, sendMessage, id }: {name:any, sendMessage:any, id:any}) => {
			//console.log(name)
			//messages[id] = {name, message: sendMessage};
			let idValue = id
			setMessages({...messages, [idValue]: {name, message: sendMessage}})
			console.log(messages)
		});
	}, [messages]);

	const sendMessage = (event: any) => {
		event.preventDefault();

		if(message) {
			socket.emit('send message', name, room, message);
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
			<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '#292929', height: 'max', minHeight: "95vh"}}>
				<div className='container' style={{marginTop: 0}}>
				<div>
					<br/>
					<div style={{width: "10px"}}>
						<Messages messages={messages} />
					</div>
					<br/>
					<br/>
						<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
					<br/>
				</div>

				</div>
				<div style={{backgroundColor: "gray", width: 'max', height: 'max', minHeight: "95vh", color: "white"}}>
				<p>Test</p>
				</div>
			</div>
			
		</div>
	)
}

export default Chat;
