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
		sounds,
	} = useGameContext();

	useEffect(() => {
		if (pickedWrongPattern) {
			document.body.classList.add("game-over");
		} else {
			document.body.classList.remove("game-over");
		}
	}, [pickedWrongPattern]);

	useEffect(() => {
		setUserPattern((prev) => [...prev, colorPressed]);
	}, [colorPressed]);

	const btnClick = (color) => {
		if (!gameRunning) return;
		setColorPressed(color);
		sounds[color]();
		checkPattern();
	};

	console.log("Computer pattern is,", randomPattern);
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
