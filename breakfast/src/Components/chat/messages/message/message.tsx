import React from 'react';

import "../../../main.css";

const Message = ({ message }: {message:any}) => {
	if (message.mention == false){
		return (

			<div style={{color: "white", backgroundColor: "#83ce73", borderRadius: "10px", marginRight: "min"}}>
				<p style={{marginLeft: "10px"}}>
				{message.name}
				</p>
				<p style={{marginLeft: "10px"}}>
				{message.message}
				</p>
			</div>
			
		)
	} else {
		return (
			<div style={{color: "white", backgroundColor: "#001eff", borderRadius: "10px", marginRight: "min"}}>
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