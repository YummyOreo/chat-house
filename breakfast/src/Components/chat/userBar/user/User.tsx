import React, { useState, useEffect } from 'react';
import PopUp from './popup/popup';

import "../../../main.css";

const User = ({user}: any) => {
	const [ buttonPopup, setButtonPopup ]: any = useState(false)
	return(
		<div>
			<PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
				<h3> {user} </h3>
			</PopUp>
			<p onClick={() => {setButtonPopup(true)}} style={{marginLeft: "1rem"}}>{user}</p>

		</div>
	)
}

export default User;