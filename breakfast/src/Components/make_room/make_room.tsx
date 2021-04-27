import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

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
	
	const cookies = new Cookies();

	if (cookies.get("token") == undefined) {
		window.location.hash = '/login'
	}	

	const [roomName, setRoomName] = useState('');
	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		socket = io(ENDPOINT, connectionOptions);
		socket.emit('join home', ({ returnRoom }: any) => {
		})
	}, [ENDPOINT, location.search])


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
						socket.emit('new room', roomName, 'chat', (id: any) => {
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
