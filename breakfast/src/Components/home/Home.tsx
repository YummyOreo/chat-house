import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'
import queryString from 'query-string';

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

	if (localStorage.getItem('token') == null) {
		window.location.href = 'login'
	}

	const [token] = useState(localStorage.getItem('token'))
	
	// {id: name}
	const [rooms, setRooms] = useState({test: "test"});
	const ENDPOINT = 'localhost:5000';
	console.log()
	useEffect(() => {

		const { code }: any = queryString.parse(location.search);

		if (code == "100") {
			addToast("You have been kicked from the room!", {
				appearance: "warning",
				autoDismiss: true,
				PlacementType: "bottom-right"
			})
		}

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

	useEffect(() => {
		socket.on("toast", (content: string, type: any) => {
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
				<Navbar />
			</div>
			<div>
				</div>
					<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '	#505050', height: 'max', minHeight: "100vh"}}>
						<div className='container' style={{marginTop: 0}}>

							<div style={{ backgroundColor: "#404040", textAlign: 'center', borderRadius: "5%", marginTop: "80px", minHeight: "85vh"}}>
								<p style={{ fontSize: "40px" }}>
								Rooms
								</p>
								<div style={{ overflow: "scroll", width: "inherit", height: "inherit"}}>
									<br/>
									<RoomList rooms={rooms}/>
								</div>
							</div>
						</div>
							<div style={{backgroundColor: "#606060", width: 'max', height: 'max', minHeight: "95vh", color: "white"}}>
								<p>test</p>
							</div>
			</div>
		</div>
	);
}

export default Home;
