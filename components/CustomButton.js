import React from "react";
import classes from "../styles/CustomButton.module.scss";

export default function CustomButton({ text, onClick }) {
	return (
		<div>
			<button type="button" className={classes.customBtn} onClick={onClick}>
				{text}
			</button>
		</div>
	);
}
