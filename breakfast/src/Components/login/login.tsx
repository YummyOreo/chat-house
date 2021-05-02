import React, { useState, useEffect } from 'react';
import "../main.css";

var connectionOptions: any =  {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity", 
	"timeout" : 10000,                  
	"transports" : ["websocket"]
};

let socket: any;

const Login = () => {
	const id = "c2e8e27f6c14e43666a4" // HERE
    const link = `https://github.com/login/oauth/authorize?client_id=${id}` 


	return (
		<div>
            <a href={link}>Login Using GitHub</a>
		</div>
	);
}

export default Login;
