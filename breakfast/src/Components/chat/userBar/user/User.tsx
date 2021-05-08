import React, { useState, useEffect } from 'react';
import PopUp from './popup/popup';

import "../../../main.css";

const User = ({user, kick, owner}: any) => {
	const [ buttonPopup, setButtonPopup ]: any = useState(false)
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
				<p onClick={() => {setButtonPopup(true)}} style={{marginLeft: "1rem"}}>{user.name}</p>

			</div>
		)
	} else {
		return(
			<div>
				<PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
					<div style={{marginLeft: "1rem"}}>
						
						<h3> {user.name} </h3>

					</div>
				</PopUp>
				<p onClick={() => {setButtonPopup(true)}} style={{marginLeft: "1rem"}}>{user.name}</p>

			</div>
		)
	}
}

export default User;