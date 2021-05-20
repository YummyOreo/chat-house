import React from 'react';

/*
	nav bar
	----
	roomName: the name of the room
*/
const NavBar = ({roomName}: any) => {

	// Css to make the navbar sticky and colored
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

	return(
		<div style={sticky}>
			<nav style={stickyInner}>

				<div className='nav-wrapper'>

					<a href="/" className="waves-effect waves-light btn" style={{marginLeft: "1rem", backgroundColor: "#001eff"}}>Back</a>
					<a className="brand-logo center">{roomName}</a>

				</div>
			
			</nav>

			<hr
       		 style={{
				color: "gray",
				backgroundColor: "gray",
				height: 2
			}}
			/>
			
		</div>
	)
}

export default NavBar;