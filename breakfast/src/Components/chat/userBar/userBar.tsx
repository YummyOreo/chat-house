import React from 'react';

import User from "./user/User"

/*
	user bar
	----
	users: all users
	kick: to kick someone
	owner: if you are the owner
*/
const UserBar = ({users, kick, owner}: any) => {

	return(
		<div>
			<br></br>
			{users.map((key: any, index: any) => <div key={key}><User user={key} kick={kick} owner={owner}/></div>)}
		</div>
	)
}

export default UserBar;