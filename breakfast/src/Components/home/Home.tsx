import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import "../main.css";

const Home = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div>
			<h1>
			Join Room
			</h1>
				<div><input placeholder="Room" type='text' onChange={(event) =>{
					setRoom(event.target.value)}}/></div>
				<Link onClick={event => (!room) ? event.preventDefault() : null}to={`/chat?room=${room}`}>
				<button type="submit">Join</button>
				</Link>
		</div>
	);
}

export default Home;
