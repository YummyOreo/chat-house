import React from 'react';

/*
	input
	----
	setMessage: to set the message
	sendMessage: func to send messgae
	type: the type of the room
	owner: if the user is the owner
	slowmode: the slowmode of the room
*/
const Input = ({ setMessage, sendMessage, type, owner, slowmode }: any) => {

	// Sets the slowmode for the owner
	if (owner) {
		slowmode = "You have no slowmode!!"
	}
	
	// If the type is chat
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

					<button 
						className="waves-effect waves-light btn"
						style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} 
						onClick={(event: any) => {
							if (event === '' || event == null) return;
							event.target.value = "";
							sendMessage(event)
						}}
						
					>
						Send
					</button>
				</form>
			</div>
		)
	
	// If the type is announcement
	} else if (type === 'announcement' && owner === false){
		
		// Makes the vars
		let placeholderText
		let disabled: boolean;

		// if the user is the owner
		if (owner === true){
			// sets the text 
			placeholderText = "Message"; 
			disabled = false
		} else { // if the user is not the owner
			// sets the text
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
							className="waves-effect waves-light btn" 
							style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} 
							onClick={(event: any) => {
								if (event === '' || disabled === true) return;
								sendMessage(event)
							}}
								
						>
							Send
						</button>
					</form>
				</div>
			)
	// catcher 
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

					<label style={{ color: "gray"}}> {slowmode} </label>

					<button 
						className="waves-effect waves-light btn" 
						style={{ backgroundColor: "#001eff", marginLeft: "45rem"}} 
						onClick={(event: any) => {
							if (event === '') return;
							sendMessage(event)
						}}
						
					>
						Send
					</button>
				</form>
			</div>
		)
	}
}

export default Input;
