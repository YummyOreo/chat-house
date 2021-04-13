import React from 'react';

import "../main.css";

const NavBar = ({roomName}: any) => {

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
					<a className="brand-logo center">{roomName}</a>
				</div>
			</nav>
		</div>
	)
}

export default NavBar;