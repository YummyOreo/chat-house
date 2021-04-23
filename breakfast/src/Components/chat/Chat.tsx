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

	function promptNameFunc(socket: any, House: any) {
		console.log(socket)
		let tryName = prompt('Whats your name');		
		socket.emit('check name', tryName, House, (result: any) => {
			if (result == true){
				promptNameFunc(socket, House)
			} else {
				console.log(tryName)
				return tryName
			}
		})
		return tryName

	}

	let [name, setName] = useState('');
	let [House, setHouse] = useState('');

	let [users, setUsers] = useState(['']);

	let [messages, setMessages] = useState({ 1: {name: "System", message: "This is the start of the chat", mention: true}});
	let [message, setMessage] = useState([]);

	let [systems] = useState([]);

	let [HouseName, setHouseName] = useState('');

	let [newName, setNewName] = useState('');

	let [owner, setOwner] = useState(false);
	let [ownerID, setOwnerID] = useState('');

	let [type, setType] = useState('');

	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		const {house}: any = queryString.parse(location.search);

		socket = io(ENDPOINT, connectionOptions);
		setTimeout(() => { 
			let promptName: string | null;
			promptName = promptNameFunc(socket, house);
			if (promptName == null) promptName = 'Guest'
			console.log(promptName)

			setName(promptName);

			setHouse(house);

			socket.emit('join', { name: promptName, House }, ({ Housename, ownerID, owner, type }: any) => {
				setHouseName(Housename);
				setType(type)
				console.log(users)
				console.log(owner)
				if (owner == true){
					setOwner(true)
					setOwnerID(ownerID)
				}
			});
			console.log(HouseName)
			console.log(owner)

		 }, 100);


		return () => {
			socket.emit("disconnect", House);

			socket.off();
		}
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('kicked', (id: any) => {
			console.log('Kicked')
			console.log(socket.id)
			//socket.emit("disconnect", House);
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
			let lowerCaseName = sendMessage.toLowerCase()
			if (lowerCaseName.includes(`@${name.toLowerCase()}`)){ mention = true}
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
		socket.emit("name change", newName, House)
	}

	const sendMessage = (event: any) => {
		event.preventDefault();

		if(message) {
			socket.emit('send message', name, House, message, ownerID);
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
			<NavBar HouseName={HouseName} changeName={changeName}/>
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
