import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import "../main.css";

var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const Login = () => {
	
	if(localStorage.getItem('token') != null) {
		window.location.href = '/home'
	}

	const id = "c2e8e27f6c14e43666a4" // HERE
    const link = `https://github.com/login/oauth/authorize?client_id=${id}` 


	return (
		<div>
			<Helmet>
				<title>Login | Chat House</title>
				<meta name="Chat House" content="Chat House, is a app for creators. You can make different types of rooms for different purposes!" />
			</Helmet>
            <a href={link}>Login Using GitHub</a>
		</div>
	);
}

export default Login;
