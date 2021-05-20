import React from 'react';
import "./popupCss.css"

/*
	Popup
	----
	props: everything
*/
const PopUp = (props: any) => {

	// if it is on
	if (props.trigger == true){
		return  (
			<div className={"popup"} >

				<div className={"popup-noShow"}  onClick={() => {props.setTrigger(false)}}></div>
				
				<div className="popup-inner" style={{marginLeft: "1rem"}}>

					<button className="waves-effect waves-light btn" id="btn" 
						onClick={() => {props.setTrigger(false)}}
						style={{backgroundColor: "#001eff"}}
					>
						Close
					</button>

					{props.children}

				</div>
			</div>

		)
	// if it is off 
	} else {
		return <div></div>
	}
}

export default PopUp;