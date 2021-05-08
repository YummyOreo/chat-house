import React from 'react';

import User from "./user/User"

import "../../main.css";

const UserBar = ({users, kick, owner}: any) => {

	return(
		<div>
			<br></br>
			{users.map((key: any, index: any) => <div key={key}><User user={key} kick={kick} owner={owner}/></div>)}
		</div>
	)
}

export default UserBar;