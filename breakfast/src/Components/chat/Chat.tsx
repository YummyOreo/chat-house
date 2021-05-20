import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'

import NavBar from './navBar/NavBar'
import Input from './input/input'
import Messages from './messages/Messages'
import UserBar from './userBar/userBar'

import "../main.css";

// Sets the gobal var socket
let socket: any;

// Inits the connection options
var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,
	"transports" : ["websocket"]
};

const Chat = ({ location }: {location:any}) => {

	// Checks if your loggedin
	if (localStorage.getItem('token') == null) {
		window.location.href = '/login'
	}

	// Inits toasts
	const { addToast } = useToasts()

	// Sets the token
	const [token] = useState(localStorage.getItem('token'))

	/*
		Vars
		----
		Name: user name
		room: room id
		users: all users
		messages: all messages
		message: the current message
		slowmode: the slowmode
		roomName: the name of the room
		owner: set if owner
		type: the type of room
	*/
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const [users, setUsers] = useState(['']);

	const [messages, setMessages] = useState({ 1: {name: "System", message: "This is the start of the chat", mention: true}});
	const [message, setMessage] = useState([]);

	const [slowmode, setSlowmode] = useState(1)

	const [roomName, setRoomName] = useState('');

	const [owner, setOwner] = useState(false);
	
	const [type, setType] = useState('');

	// Sets the server link
	const ENDPOINT = 'localhost:5000';

	// Joining/leaving (WOW)
	useEffect(() => {

		// Gets the room id
		const { id }: any = queryString.parse(location.search);

		// Makes the socket connection
		socket = io(ENDPOINT, connectionOptions);

		// Waits 100 ms
		setTimeout(() => { 

			// Saves the room id
			setRoom(id);

			/*
				Server join
				----
				token: the user token
				id: room id
				---
				callback
				----
				roomname: the name of the room
				owner: if they are the owner
				type: the type of the room
				name: your name
				slowmode: the number of slowmode
			*/
			socket.emit('join', { token, id }, ({ roomname, owner, type, name, slowmode }: any) => {
				// If the room does not exist
				if (roomname === null || roomname === undefined) window.location.href = '/home?code=101'

				// Sets the slowmode
				setSlowmode(slowmode)

				// Sets the room name
				setRoomName(roomname);

				// Sets the user name
				setName(name)

				// Sets the room type
				setType(type)

				// sets the owner
				if (owner === true){
					setOwner(true)
				}
			});
		}, 100);

		// On leave
		return () => {
			// disconnects from the server
			socket.emit("disconnect", room);

			// turns the socket off
			socket.off();
		}
	}, [ENDPOINT, location.search, owner, room, roomName, token, users]);

	// TOASTS
	useEffect(() => {
		/*
			toast
			----
			content: the message in the toast
			type: the type of toast, examples:
			- warning
			- info
			- success
			- error
		*/
		socket.on("toast", (content: any, type: any) => {
			// Adds the toast
			addToast(content, {
				// what it looks like/toast
				appearance: type,
				// dismisses in 10 seconds
				autoDismiss: true,
				// put it on the bottom right
				PlacementType: "bottom-right"
			})
		})
	}, [ addToast ])

	// kick check
	useEffect(() => {

		/*
			Kick check
			----
			ID: the id of the person getting kicked
		*/
		socket.on('kicked', (id: any) => {
			// Gets your id
			console.log(localStorage.getItem('id'))

			// checks if its the id of the user getting kicked
			if (id === localStorage.getItem('id')){
				// disconnects from the room
				socket.emit("disconnect", room);
				socket.off();
				window.location.href = '/home?code=100'
			}
			
		})
	})

	// When a message is sent
	useEffect(() => {

		/*
			When a Message Was sent
			----
			nameSend: the name of the user sending the message
			sendMessage: the contents of the message
			id: the id of the message
		*/
		socket.on('message', (nameSend: any, sendMessage: any, id: any ) => {
			// some stuff 
			let idValue = id
			let mention = false

			// Checks if its a mention
			let lowerCaseName = sendMessage.toLowerCase()
			if (lowerCaseName.includes(`@${name.toLowerCase()}`)){ mention = true}

			// Appends it to the messages
			setMessages({...messages, [idValue]: {name: nameSend, message: sendMessage, mention}})

			// Scrolls down to the bottem of the page
			let element: HTMLElement | null = document.getElementById("box");
			if (element === null) return;
			element.scrollIntoView({behavior: "smooth", block: "nearest"})
		});
	}, [messages]);

	// Updating the user list
	useEffect(() => {
		/*
			Update user list
			----
			userList: the list of user objects
		*/
		socket.on("user list", (userList: any) => {
			// Sets the user list in react to the uers list from the server
			setUsers(userList)
		})
	}, [users])

/*
	Send Message
	----
	event: the event object
*/
	const sendMessage = (event: any) => {
		// Checks if the user is not sending a message
		if (message === [] || message === null || message === undefined) return
		
		// Prevents the default event that heppends when you submit a from (Prevents it from reloading)
		event.preventDefault();

		// Resets the message
		setMessage([]);
		event.target.value = ""

		// If message is not false/null
		if(message) {
			/* 
				Send the messgae back to the server
				----
				Name: Name of the user
				Room: Room id
				Message: the message that is being sent
			*/
			socket.emit('send message', name, room, message);
		}

	}
/* 
	Kicking:
	----
	ID: the id of the user getting kicked
*/
	const kick = (id: any) => {
		/* 
			Emits back to the server
			----
			id: the id of the user getting kicked
			token: the token of the client
			room: the room id
		*/
		socket.emit("kick", id, token, room)
	}

	return (
		<div>
			<div style={{"zIndex": 10}}>
				<NavBar roomName={roomName}/>
			</div>	

			<br/>
			<br/>

			<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '	#505050', minHeight: "93vh"}}>
				
				<div className='container' style={{marginTop: 0}}>

					<br></br>
					<br></br>
					
					<div style={{ backgroundColor: "#404040", borderRadius: "5%"}}>
						
						<br/>
						
						<div style={{width: "10px", marginLeft: "1rem"}}>
							
							<Messages messages={messages} />
						
						</div>
						
						<br/>
						<br/>
						
						<div style={{marginLeft: "1rem", marginRight: "1rem"}}>
							
							<Input slowmode={slowmode} setMessage={setMessage} sendMessage={sendMessage} type={type} owner={owner}/>
						
						</div>
						
						<br/>

					</div>

				</div>

				<div style={{backgroundColor: "#606060", width: 'max', minHeight: "93vh", color: "white"}}>
					
					<UserBar users={users} kick={kick} owner={owner}/>
			
				</div>
			
			</div>
			
		</div>
	)
}

export default Chat;
