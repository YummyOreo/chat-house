import React from 'react';
import "../../../main.css";

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
		<div> 

			<br/>

			<div style={{color: "white", backgroundColor: "", borderRadius: "10px", marginRight: "min", height: "content"}}>


				<div style={{marginLeft: "10px"}}>

				<p>{message.name}</p>
				<p>{message.message}</p>

				</div>

			</div>
		</div>
		)
	} else {
		return (
		<div>

			<br/>

			<div style={{color: "white", backgroundColor: "#001eff", borderRadius: "10px", marginRight: "min", height: "content", minHeight: "30px", verticalAlign: "50%", flexWrap: 'wrap'}}>
					
				<div style={{marginLeft: "10px"}}>

					<p>{message.name}</p>
					<p>{message.message}</p>

				</div>

			</div>
		
		</div>
		)
	}
}

export default Message;