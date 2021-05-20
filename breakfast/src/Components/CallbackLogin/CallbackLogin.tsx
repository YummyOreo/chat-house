import React, { useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

import "../main.css";

// Inits the connection options
var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,
	"transports" : ["websocket"]
};

// sets the global vars
let socket: any;

const CallbackLogin = ({ location }: any) => {

	// sets the endpoint
	const ENDPOINT = 'localhost:5000';
	
	// gets the code 
	const { code }: any = queryString.parse(location.search);

	useEffect(() => {
		
		// Connects to the server
		socket = io(ENDPOINT, connectionOptions);
		
		/*
			Make account
			----
			code: the code from the url
			--
			token: your user token
			id: your user id
		*/
		socket.emit('Make Account', code, (token: any, id: any) => {

			// Saves the token
			localStorage.setItem('token', token);

			// Saves the ID
			localStorage.setItem('id', id);

			// Goes back to home
			window.location.href = '/'
		})

	}, [ENDPOINT, location.search])

	return (
	    <div>
			<h1>Making Account/Loging in</h1>
		</div>
	)
}

export default CallbackLogin;
