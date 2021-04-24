import React from 'react';

import "../../main.css";

const Navbar = () => {

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
					<a href="/" className="waves-effect waves-light btn">Rooms</a>
				</div>
			</nav>
		</div>
	)
}

export default Navbar;