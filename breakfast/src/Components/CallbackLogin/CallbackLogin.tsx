import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import queryString from 'query-string';

import "../main.css";


var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const CallbackLogin = ({ location }: any) => {
	const ENDPOINT = 'localhost:5000';
	
	const { code }: any = queryString.parse(location.search);

	console.log()
	useEffect(() => {
		socket = io(ENDPOINT, connectionOptions);
		
		socket.emit('Make Account', code, (token: any, id: any) => {
			console.log(token)
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
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
