"use client";
import React, { useState } from "react";
import classes from "../styles/Landing.module.scss";

export default function LandingPage() {
	const [name, setName] = useState("");
	return (
		<div className={classes.container}>
			<div className={classes.matrix_container}>
				<h1>Welecome to Simon Says</h1>
				<div className={classes.rain}></div>
			</div>
			<div className={classes.nameInputs}>
				<div>
					<label className={classes.label} htmlFor="name">
						What is your name?
					</label>
				</div>
				<div>
					<input
						className={classes.input}
						id="name"
						type="text"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<button className={classes.start}>Start Now</button>
				</div>
			</div>
		</div>
	);
}
