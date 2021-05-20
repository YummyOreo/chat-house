import React, { useState, useEffect } from 'react';

import "../../main.css";

const Navbar = () => {

	const sticky: any = {
		position: "fixed",
		height: "3rem",
		backgroundColor: "#606060"
	}
	const stickyInner: any = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: "#606060"
	}
	const [roomName, setRoomName] = useState('');

	return(
		<div style={sticky}>

			<nav style={stickyInner}>

				<div className='nav-wrapper'>

					<a className="waves-effect waves-light btn" 
						style={{marginLeft: "1rem", backgroundColor: "#001eff"}}
						onClick={() => {
							window.location.href = '/make'
						}}
					>
						Make Room
					</a>

				</div>

			</nav>

			<hr
       		 style={{
				color: "darkgray",
				backgroundColor: "darkgray",
				height: 2
			}}
			/>
			
		</div>
	)
}

export default Navbar;