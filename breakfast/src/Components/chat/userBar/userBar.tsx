import React from 'react';

import User from "./user/User"

import "../../main.css";

const UserBar = ({users, socket, owner, token, room}: any) => {

	return(
		<div>
			<br></br>
			{users.map((key: any, index: any) => <div key={key}><User user={key} sokcet={socket} owner={owner} token={token} room={room}/></div>)}
		</div>
	)
}

export default UserBar;