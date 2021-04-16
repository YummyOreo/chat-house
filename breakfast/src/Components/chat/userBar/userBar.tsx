import React from 'react';

import "../../main.css";

const UserBar = ({users}: any) => {

	return(
		<div>
			{users.map((key: any, index: any) => <div key={key}><p>{key}</p></div>)}
		</div>
	)
}

export default UserBar;