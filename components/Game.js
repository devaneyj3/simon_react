"use client";
import classes from "../styles/Game.module.scss";
import { COLORS, randomColor, runGame } from "@/utils";
import CustomButton from "./CustomButton";
import { useEffect } from "react";
import useSound from "use-sound";
import ScoreDisplay from "./ScoreDisplay";
import { useGameContext } from "@/context/gameContext";

export default function Game() {
	const { colorPressed, setColorPressed } = useGameContext();
	const [playRed] = useSound("/sounds/red.mp3");
	const [playYellow] = useSound("/sounds/yellow.mp3");
	const [playGreen] = useSound("/sounds/green.mp3");
	const [playBlue] = useSound("/sounds/blue.mp3");

	useEffect(() => {
		runGame();
	}, []);

	const sounds = {
		red: playRed,
		yellow: playYellow,
		green: playGreen,
		blue: playBlue,
	};

	const btnClick = (color) => {
		setColorPressed(color);
		sounds[color]();
		setTimeout(() => setColorPressed(""), 200);
	};

	return (
		<div className={classes.container}>
			<h1>Click the button below to start the game</h1>
			<ScoreDisplay />
			<div className={classes.gamePad}>
				{COLORS.map((color) => (
					<div
						key={color}
						style={{
							boxShadow: colorPressed === color ? `0 0 20px ${color}` : "none",
						}}
						className={`${classes.square} ${classes[color]} ${
							colorPressed === color && classes.pressed
						}`}
						onClick={() => btnClick(color)}
					/>
				))}
			</div>
			<CustomButton text="Start" />
		</div>
	);
}
