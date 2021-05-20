import React, { useState, useEffect } from 'react';
import PopUp from './popup/popup';

/*
	User in user bar
	----
	user: the user object of the user
	kick: to kick a users
	owner: if they are the owner
*/
const User = ({user, kick, owner}: any) => {
	
	// Sets the popup
	const [ buttonPopup, setButtonPopup ]: any = useState(false)

	// if they are the owner
	if (owner){
		return(
			<div>
				<PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
					<div style={{marginLeft: "1rem"}}>
						
						<h3> {user.name} </h3>

						<button className="waves-effect waves-light btn"
							onClick={() => {
								kick(user.id)
							}}
							style={{backgroundColor: "#001eff"}}
						>
							Kick
						</button>

					</div>
				</PopUp>

				<p onClick={() => {setButtonPopup(true)}} 
					style={{marginLeft: "1rem"}}
				>
					{user.name}
				</p>

			</div>
		)

	// if there not the owner
	} else {
		return(
			<div>
				<PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
					<div style={{marginLeft: "1rem"}}>
						
						<h3> {user.name} </h3>

					</div>
				</PopUp>

				<p onClick={() => {setButtonPopup(true)}} 
					style={{marginLeft: "1rem"}}
				>
					{user.name}
				</p>

			</div>
		)
	}
}

export default User;