import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';

import "../main.css";

var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const Login = ({ location }: any) => {
	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		socket = io(ENDPOINT, connectionOptions);
	}, [ENDPOINT, location.search])

	return (
		<div>
		</div>
	);
}

export default Login;
