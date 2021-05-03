import React from 'react';
import Popup from 'reactjs-popup';
import "../../../main.css";

import "./popup.css"

function emoji(message: any){
	message = message.replace('\:', ":")
	message = message.replace('\;', ";")
	message = message.replace('\|', "|")
	message = message.replace(':)', "🙂")
	message = message.replace(';)', "😉")
	message = message.replace(':o', "😮")
	message = message.replace(':0', "😮")
	message = message.replace(':|', "😐")
	message = message.replace(':p', "😛")
	message = message.replace(':P', "😛")
	message = message.replace(';p', "😜")
	message = message.replace(';P', "😜")
	return message
}

const Message = ({ message }: {message:any}) => {
	message.message = emoji(message.message)
	if (message.mention == false){
		return (

			<div style={{color: "white", backgroundColor: "", borderRadius: "10px", marginRight: "min", height: "content"}}>
				<div style={{marginLeft: "10px"}}>
				<Popup trigger={<button className="button">{message.name}</button>} modal>
   					<span> Modal content </span>
 				</Popup>: {message.message}
				</div>
			</div>
			
		)
	} else {
		return (
			<div style={{color: "white", backgroundColor: "#001eff", borderRadius: "10px", marginRight: "min", height: "content", minHeight: "30px", verticalAlign: "50%", flexWrap: 'wrap'}}>
					<p style={{marginLeft: "10px"}}>
					{message.name}
					</p>
					<p style={{marginLeft: "10px"}}>
					{message.message}
					</p>
			</div>
		)
	}
}

export default Message;