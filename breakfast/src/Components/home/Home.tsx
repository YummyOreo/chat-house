import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import "../main.css";

const Home = () => {
	const [name, setName] = useState('');
	const [House, setHouse] = useState('');

	return (
		<div>
			<h1>
			Join House
			</h1>
				<div><input placeholder="House" type='text' onChange={(event) =>{
					setHouse(event.target.value)}}/></div>
				<Link onClick={event => (!House) ? event.preventDefault() : null}to={`/chat?house=${House}`}>
				<button type="submit">Join</button>
				</Link>
		</div>
	);
}

export default Home;
