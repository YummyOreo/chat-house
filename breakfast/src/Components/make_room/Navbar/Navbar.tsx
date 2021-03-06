import React from 'react';

import "../../main.css";

const Navbar = () => {

	const sticky: any = {
		position: "fixed",
		height: "3rem",
		backgroundColor: "gray"
	}
	const stickyInner: any = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: "gray"
	}

	return(
		<div style={sticky}>
			<nav style={stickyInner}>
				<div className='nav-wrapper'>
					<a href="/" className="waves-effect waves-light btn">Rooms</a>
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