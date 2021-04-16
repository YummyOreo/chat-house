import React from 'react';
import io from 'socket.io-client';

import "../../main.css";

const NavBar = ({roomName, changeName}: any) => {

	const sticky: any = {
		position: "fixed",
		height: "3rem"
	}
	const stickyInner: any = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
	}

	return(
		<div style={sticky}>
			<nav style={stickyInner}>
				<div className='nav-wrapper'>
					<a href="/" className="waves-effect waves-light btn">Back</a>
					<a id="change name" className="waves-effect waves-light btn" onClick={() => {changeName()}}>Change Name</a>
					<a className="brand-logo center">{roomName}</a>
				</div>
			</nav>
		</div>
	)
}

export default NavBar;