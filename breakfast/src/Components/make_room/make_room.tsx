import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'

import "../main.css";

import Navbar from "./Navbar/Navbar"

var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const MakeRoom = ({ location}: any) => {

	if (localStorage.getItem('token') == null) {
		window.location.href = '/login'
	}

	const { addToast } = useToasts()
	const [token] = useState(localStorage.getItem('token'))

	const [roomName, setRoomName] = useState('');
	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		socket = io(ENDPOINT, connectionOptions);
		socket.emit('join home', ({ returnRoom }: any) => {
		})
	}, [ENDPOINT, location.search])

	useEffect(() => {
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
					}}>
					submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default MakeRoom;
