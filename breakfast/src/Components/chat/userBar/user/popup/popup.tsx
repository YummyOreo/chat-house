import React from 'react';
import "./popupCss.css"

const PopUp = (props: any) => {
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
	} else {
		return <div></div>
	}
}

export default PopUp;