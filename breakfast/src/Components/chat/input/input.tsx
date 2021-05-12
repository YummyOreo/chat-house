import React from 'react';

import "../../main.css";

const Input = ({ message, setMessage, sendMessage, type, owner, slowmode }: any) => {
	if (owner) {
		slowmode = "You have no slowmode!!"
	}
	if (type === 'chat'){
		return (
			<div>
				<form>
					<input
					style={{color: "white"}}
					id='input'
					type="text"
					placeholder="Message"
					onChange={(event) => {
						setMessage(event.target.value)
					}} 
					onKeyPress={event => {if (event.key === "Enter"){
						sendMessage(event)
						} 
					}}
					/>
					<label style={{ color: "gray"}}> {slowmode} </label>
					<button className="waves-effect waves-light btn" style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} onClick={(event: any) => {
						if (event == '' || event == null) return;
						event.target.value = "";
						sendMessage(event)
						
					}}>Send
					</button>
				</form>
			</div>
		)
	} else if (type === 'announcement' && owner === false){
		let placeholderText
		let disabled: boolean;
		if (owner === true){
			placeholderText = "Message"; 
			disabled = false
		} else {
			placeholderText = "You Can Not Chat Here"
			disabled = true
		}
		return (
				<div>
					<form>
						<input
						disabled = {disabled}
						style={{color: "white"}}
						type="text"
						placeholder={placeholderText}
						onChange={(event) => setMessage(event.target.value)} 
						onKeyPress={event => event.key === "Enter" && disabled === false ? sendMessage(event) : null}
						/>
						<button 
						disabled={disabled}
						className="waves-effect waves-light btn" style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} onClick={(event: any) => {
							if (event == '' || disabled == true) return;
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
					style={{color: "white"}}
					type="text"
					placeholder="Message"
					onChange={(event) => setMessage(event.target.value)} 
					onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
					/>
					<button className="waves-effect waves-light btn" style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} onClick={(event: any) => {
						if (event == '') return;
						sendMessage(event)
						
					}}>Send
					</button>
				</form>
			</div>
		)
	}
}

export default Input;
