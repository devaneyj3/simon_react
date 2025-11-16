"use client";
import classes from "../styles/Game.module.scss";
import CustomButton from "./CustomButton";
import { useEffect } from "react";
import ScoreDisplay from "./ScoreDisplay";
import { useGameContext, COLORS } from "@/context/gameContext";

export default function Game() {
	const {
		colorPressed,
		setColorPressed,
		gameRunning,
		level,
		stopGame,
		startGame,
		checkPattern,
		heading,
		pickedWrongPattern,
		currentRandomColor,
		sounds,
		userPattern,
		randomPattern,
		levelMsg,
	} = useGameContext();

	useEffect(() => {
		if (pickedWrongPattern) {
			document.body.classList.add("game-over");
		} else {
			document.body.classList.remove("game-over");
		}
	}, [pickedWrongPattern]);
	const btnClick = (color) => {
		if (!gameRunning) return;
		setColorPressed(color);
		sounds[color]();
		checkPattern(color);
	};


	return (
		<div className={classes.container}>
			{gameRunning ? <h1>Level {level}</h1> : <h1>{heading}</h1>}
			{levelMsg && <p>{levelMsg}</p>}
			<ScoreDisplay />
			<div className={classes.gamePad}>
				{COLORS.map((color) => (
					<div
						key={color}
						className={`${classes.square} ${classes[color]} ${
							colorPressed === color ? classes.pressed : ""
						} ${
							currentRandomColor === color
								? classes[`${color}Glow`] && classes.fade
								: ""
						}`}
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
