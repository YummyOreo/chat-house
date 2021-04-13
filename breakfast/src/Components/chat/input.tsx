import React from 'react';

import "../main.css";

const Input = ({ message, setMessage, sendMessage }: any) => (
	<div>
		<form>
			<input
			style={{color: "white"}}
			type="text"
			placeholder="Message"
			onChange={(event) => setMessage(event.target.value)} 
			onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
			/>
			<button className="waves-effect waves-light btn" onClick={(event: any) => {
				if (event == '') return;
				sendMessage(event)
				
			}}>Send
			</button>
		</form>
	</div>
)

export default Input;