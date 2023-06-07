import React from "react";
import {Button} from "@mui/materials" //npm install @mui/material @emotion/react @emotion/styled


function MyButton(props) {
	return (
		<div>
			<Button 
				variant = "contained"
				color = "primary"		
				onClick={props.fcn} className="cta-button">
				{props.buttonLabel}
			</Button>
		</div>
	);
}
export default MyButton;
