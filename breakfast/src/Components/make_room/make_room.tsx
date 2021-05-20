import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'
import { Helmet } from 'react-helmet'

import "../main.css";

import Navbar from "./Navbar/Navbar"

// global vars
var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,
	"transports" : ["websocket"]
};

let socket: any;

const MakeRoom = ({ location}: any) => {

	// cheks if their logged in
	if (localStorage.getItem('token') == null) {
		window.location.href = '/login'
	}

	// inits the toasts
	const { addToast } = useToasts()

	// Saves the token
	const [token] = useState(localStorage.getItem('token'))

	// Other
	const [roomName, setRoomName] = useState('');
	const ENDPOINT = 'localhost:5000';

	useEffect(() => {

		// Conects to the server
		socket = io(ENDPOINT, connectionOptions);

	}, [ENDPOINT, location.search])

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
			addToast(content, {
				appearance: type,
				autoDismiss: true,
				PlacementType: "bottom-right"
			})
		})
	}, [ addToast ])

	return (
		<div>
			
			<Helmet>
				<title>Make Room | Chat House</title>
				<meta name="Chat House" content="Chat House, is a app for creators. You can make different types of rooms for different purposes!" />
			</Helmet>

			<div>
				<Navbar/>
			</div>

			<div>

				<form>
					<p>Make Room</p>
					
					<input
						type='text'
						onChange={(event) => setRoomName(event.target.value)}
					/>
					
					<button 
						onClick={(event) => {
							event.preventDefault()
							socket.emit('new room', roomName, 'chat', token, (id: any) => {
								window.location.href = `/chat?id=${id}`;
							})
						}}
					>
						submit
					</button>

				</form>
				
			</div>
		</div>
	);
}

export default MakeRoom;
