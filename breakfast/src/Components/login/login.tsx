import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import "../main.css";
import fs from 'fs'

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
	const id = fs.readFileSync("../../../env", {encoding:'utf8', flag:'r'})
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
