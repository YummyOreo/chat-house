import React from 'react';

import "../../main.css";

const RoomList = ({ rooms }: any) => {
	console.log(rooms)
	return(
	<div style={{"zIndex": 0, overflow: "scroll", height: "20rem", width: "20rem", minWidth: 'max-content', "borderRadius": "10px"}}>
		{Object.keys(rooms).map((key, index) => <div style={{ marginLeft: "24rem", marginTop: "10px" }} key={key}><a href={`/chat?id=${key}`} className={"waves-effect waves-light btn"} style={{ backgroundColor: "#001eff" }}>{rooms[key]}</a></div>)}
	</div>
	)
}

export default RoomList;