import React from 'react';

//import ScrollToBottom from "react-scroll-to-bottom"

import Message from "./message/message"

import "../../main.css";
import "./noScrollBar.css";

const Messages = ({ messages }: any) => {

	return(
	<div className="message-contaner" style={{"zIndex": 0, overflow: "scroll", height: "20rem", width: "20rem", minWidth: 'max-content', "borderRadius": "10px"}}>
		{Object.keys(messages).map((key, index) => <div key={key}><Message message={messages[key]}/></div>)}
	</div>
	)
}

export default Messages;