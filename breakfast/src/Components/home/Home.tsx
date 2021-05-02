import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'

import "../main.css";

import RoomList from "./rooms/rooms"
import Navbar from './NavBar/NavBar'

var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const Home = ({ location }: any) => {
	const { addToast } = useToasts()

	/* 
		addToast("TEXT", {
			appearance: 'success',
			autoDismiss: true,
			PlacementType: "bottom-right"
		})
	*/

	if (localStorage.getItem('token') == null) {
		window.location.href = 'login'
	}

	const [token] = useState(localStorage.getItem('token'))

	// {id: name}
	const [rooms, setRooms] = useState({test: "test"});
	const ENDPOINT = 'localhost:5000';
	console.log()
	useEffect(() => {

		socket = io(ENDPOINT, connectionOptions);
		socket.emit('join home', ( returnRoom: any) => {
			setRooms(returnRoom)
		})
	}, [ENDPOINT, location.search])
	useEffect(() => {
		socket.on('room update', (returnRoom: any) => {
			console.log(returnRoom)
			setRooms(returnRoom)
		})
	}, [rooms])

	return (
		<div>
			<div>
				<Navbar/>
			</div>
			<div>
				</div>
					<div style={{ backgroundColor: "gray" }}>
						<h1>
						Rooms
						</h1>
					<div style={{ textAlign: 'center'}}>
						<RoomList rooms={rooms}/>
					</div>
			</div>
		</div>
	);
}

export default Home;
