"use client";
import classes from "../styles/Game.module.scss";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import ScoreDisplay from "./ScoreDisplay";
import { useGameContext, COLORS } from "@/context/gameContext";

export default function Game() {
	const {
		colorPressed,
		setColorPressed,
		gameRunning,
		level,
		randomPattern,
		userPattern,
		setUserPattern,
		stopGame,
		startGame,
		checkPattern,
		heading,
		pickedWrongPattern,
		currentRandomColor,
	} = useGameContext();
	const [playRed] = useSound("/sounds/red.mp3");
	const [playYellow] = useSound("/sounds/yellow.mp3");
	const [playGreen] = useSound("/sounds/green.mp3");
	const [playBlue] = useSound("/sounds/blue.mp3");

	useEffect(() => {
		if (pickedWrongPattern) {
			document.body.classList.add("game-over");
		} else {
			document.body.classList.remove("game-over");
		}
	}, [pickedWrongPattern]);

	const sounds = {
		red: playRed,
		yellow: playYellow,
		green: playGreen,
		blue: playBlue,
	};

	const btnClick = (color) => {
		if (!gameRunning) return;
		setColorPressed(color);
		sounds[color]();
		setUserPattern((prev) => [...prev, color]);
		console.log("line 49, Game.jsx ", userPattern);
		checkPattern();
	};

	console.log("Computer pattern is,", randomPattern);
	console.log("User pattern is,", userPattern);
	console.log("Random color is,", currentRandomColor);

	return (
		<div className={classes.container}>
			{gameRunning ? <h1>Level {level}</h1> : <h1>{heading}</h1>}
			<ScoreDisplay />
			<div className={classes.gamePad}>
				{COLORS.map((color) => (
					<div
						key={color}
						style={{
							boxShadow: colorPressed === color ? `0 0 20px ${color}` : "none",
						}}
						className={`${classes.square} ${classes[color]} ${
							colorPressed === color ? classes.pressed : ""
						} ${currentRandomColor === color ? classes.fade : ""}`}
						onClick={() => btnClick(color)}
					/>
				))}
			</div>
			<CustomButton
				text={gameRunning ? "Stop" : "Start"}
				onClick={() => (gameRunning ? stopGame() : startGame())}
			/>
		</div>
	);
}
