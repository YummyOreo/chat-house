import React from 'react';

import Message from "./message/message"

import "./noScrollBar.css";

/*
	All messages
	----
	messages: messages object (holds all messages)
*/
const Messages = ({ messages }: any) => {
	
	// maps the keys to a div
	return(
	<div className="message-contaner" style={{"zIndex": 0, overflow: "scroll", height: "20rem", width: "20rem", minWidth: 'max-content', "borderRadius": "10px"}}>
		{Object.keys(messages).map((key, index) => <div key={key}><Message message={messages[key]}/></div>)}
		<div id={"box"}></div>
	</div>
	)
}

export default Messages;