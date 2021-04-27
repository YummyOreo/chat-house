import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const cookies = new Cookies();

	useEffect(() => {
		socket = io(ENDPOINT, connectionOptions);
	}, [ENDPOINT, location.search])

	return (
		<div>
            <form>
                <input
                    type='text'
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type='text'
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button 
                onClick={(event) => {
                    event.preventDefault()
                    if (name == "" || email == "") return;
                    socket.emit('Make Account', name, email, (token: any) => {
                        console.log(token)
                        cookies.set('token', token, { path: '/' });
                        console.log(cookies.get('token'))
                        window.location.href = `/`;
                    })
                }}>
                submit
                </button>
				</form>
		</div>
	);
}

export default Login;
