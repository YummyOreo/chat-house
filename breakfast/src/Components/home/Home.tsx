import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useToasts } from 'react-toast-notifications'
import queryString from 'query-string';
import { Helmet } from 'react-helmet'

import "../main.css";

import RoomList from "./rooms/rooms"
import Navbar from './NavBar/NavBar'

// Makes the connection options
var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,
	"transports" : ["websocket"]
};

// Sets gobal vars
let socket: any;

const Home = ({ location }: any) => {

	// Inits the toasts
	const { addToast } = useToasts()

	// Checks if thier loggedin
	if (localStorage.getItem('token') == null) {
		window.location.href = 'login'
	}

	// Defs the endpoint
	const ENDPOINT = 'localhost:5000';

	// Gets the token
	const [token] = useState(localStorage.getItem('token'));
	
	// connects to the server
	socket = io(ENDPOINT, connectionOptions);
	
	// sets some vars
	const [rooms, setRooms] = useState({test: "test"});

	useEffect(() => {

		// Gets the error code (if there is one)
		const { code }: any = queryString.parse(location.search);
		
		if (code == "100") {

			// kick toast code 
			addToast("You have been kicked from the room!", {
				appearance: "warning",
				autoDismiss: true,
				PlacementType: "bottom-right"
			})
		} else if (code == '101') {
			
			// Room does not exist 
			addToast("This room does not exist", {
				appearance: "warning",
				autoDismiss: true,
				PlacementType: "bottom-right"
			})
		}

		/*
			Home join
			----
			returnRoom: all the rooms (public)
		*/		
		socket.emit('join home', ( returnRoom: any) => {
			
			// saves the rooms
			setRooms(returnRoom)
		})
	}, [ENDPOINT, location.search])

	useEffect(() => {
		/*
			Room update 
			----
			returnRoom: all the rooms (public)
		*/
		socket.on('room update', (returnRoom: any) => {
			
			// saves the rooms
			setRooms(returnRoom)
		})
	}, [rooms])

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

			<Helmet>
				<title>Home | Chat House</title>
				<meta name="Chat House" content="Chat House, is a app for creators. You can make different types of rooms for different purposes!" />
			</Helmet>

			<div>
				<Navbar/>
			</div>
					
					<div style={{display: "grid", gridTemplateColumns: "11fr 3fr", gridGap: "0", backgroundColor: '	#505050', height: 'max', minHeight: "100vh"}}>
						
						<div className='container' style={{marginTop: 0}}>

							<div style={{ backgroundColor: "#404040", textAlign: 'center', borderRadius: "5%", marginTop: "80px", minHeight: "85vh"}}>
								
								<p style={{ fontSize: "40px" }}>
									Rooms
								</p>
								
								<div style={{ overflow: "scroll", width: "inherit", height: "inherit", "zIndex": 0}}>
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
