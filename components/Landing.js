"use client";
import React from "react";
import { useRouter } from "next/navigation";
import classes from "../styles/Landing.module.scss";
import CustomButton from "./CustomButton";
import { useGameContext } from "@/context/gameContext";

export default function Landing() {
	const { setName, name } = useGameContext();
	const router = useRouter();
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
				{name && (
					<CustomButton text="Start" onClick={() => router.push("/game")} />
				)}
			</div>
		</div>
	);
}
