"use client";
import { createContext, useContext, useState } from "react";
import useSound from "use-sound";

export const GameContext = createContext();

export const COLORS = ["red", "yellow", "green", "blue"];
export const GameContextProvider = ({ children }) => {
	const [colorPressed, setColorPressed] = useState("");
	const [heading, setHeading] = useState(
		"Click the button below to start the game"
	);
	const [name, setName] = useState("");
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [userPattern, setUserPattern] = useState([]);
	const [randomPattern, setRandomPattern] = useState([]);
	const [level, setLevel] = useState(1);
	const [gameRunning, setGameRunning] = useState(false);
	const [pickedWrongPattern, setPickedWrongPattern] = useState(false);
	const [currentRandomColor, setCurrentRandomColor] = useState(null);
	const [levelMsg, setLevelMsg] = useState("");
	const [playWrong] = useSound("/sounds/wrong.mp3");
	const [playRed] = useSound("/sounds/red.mp3");
	const [playYellow] = useSound("/sounds/yellow.mp3");
	const [playGreen] = useSound("/sounds/green.mp3");
	const [playBlue] = useSound("/sounds/blue.mp3");

	const sounds = {
		red: playRed,
		yellow: playYellow,
		green: playGreen,
		blue: playBlue,
	};
	const generateRandomColor = () => {
		const randomNum = Math.floor(Math.random() * COLORS.length);
		const color = COLORS[randomNum];
		setRandomPattern((prev) => [...prev, color]);
		sounds[color]();
		setCurrentRandomColor(color);
		setTimeout(() => setCurrentRandomColor(null), 2000);
	};

	const startGame = () => {
		setGameRunning(true);
		setLevelMsg(null);
		generateRandomColor();
	};

	const stopGame = () => {
		if (score > highScore) setHighScore(score);
		setGameRunning(false);
		setHeading("Game Over. Press button to restart.");
		setLevelMsg(`You finished at level ${level}`);
		setRandomPattern([]);
		setUserPattern([]);
		setLevel(1);
		setScore(0);
		setColorPressed("");
	};

	const checkPattern = (color) => {
		const newPattern = [...userPattern, color];
		setUserPattern(newPattern);
		if (
			newPattern.length === randomPattern.length &&
			newPattern.every((current, index) => current === randomPattern[index])
		) {
			setScore((prev) => prev + 100);
			setLevel((prev) => prev + 1);
			generateRandomColor();
		} else {
			stopGame();
			//play wrong button sound
			setHeading("Game Over. Press button to restart");
			setPickedWrongPattern(true);
			setTimeout(() => {
				setPickedWrongPattern(false);
			}, 300);
			playWrong();
		}
	};

	const values = {
		level,
		setLevel,
		gameRunning,
		setGameRunning,
		colorPressed,
		setColorPressed,
		name,
		setName,
		score,
		setScore,
		highScore,
		setHighScore,
		stopGame,
		startGame,
		checkPattern,
		heading,
		setHeading,
		pickedWrongPattern,
		currentRandomColor,
		sounds,
		levelMsg,
	};

	return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error("useGameContext must be used within a GameContextProvider");
	}
	return context;
};
