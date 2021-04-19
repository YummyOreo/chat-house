import React from 'react';

import "../../main.css";

const Input = ({ message, setMessage, sendMessage, type, owner }: any) => {
	if (type === 'chat'){
		return (
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
	} else if (type === 'announcement'){
		if (owner === true){
			return (
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
		} else {
			return (
				<div>
					<form>
						<input
						disabled = {true}
						style={{color: "white"}}
						type="text"
						placeholder="You Can Not Chat Here"
						/>
						<button className="waves-effect waves-light btn" >Send
						</button>
					</form>
				</div>
			)
		}
	}
}

export default Input;