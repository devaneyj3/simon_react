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
	const [gameIsOver, setGameIsOver] = useState(false);
	const [level, setLevel] = useState(1);
	const [gameRunning, setGameRunning] = useState(false);
	const [pickedWrongPattern, setPickedWrongPattern] = useState(false);
	const [currentRandomColor, setCurrentRandomColor] = useState(null);
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
		setTimeout(() => setCurrentRandomColor(null), 500);
	};

	const startGame = () => {
		setGameRunning(true);
		generateRandomColor();
	};

	const stopGame = () => {
		setGameRunning(false);
		setRandomPattern([]);
		setUserPattern([]);
		setLevel(1);
		setScore(0);
		setColorPressed("");
	};

	const checkPattern = () => {
		console.log(userPattern);
		console.log(randomPattern);
		console.log(`${userPattern} == ${randomPattern}`);
		if (
			userPattern.length === randomPattern.length &&
			userPattern.every((current, index) => current === randomPattern[index])
		) {
			setLevel((prev) => prev + 1);
			console.log("right pattern");
			generateRandomColor();
		} else {
			// console.log("wrong pattern");
			// stopGame();
			// //play wrong button sound
			// setHeading("Game Over. Press button to restart");
			// setPickedWrongPattern(true);
			// setTimeout(() => {
			// 	setPickedWrongPattern(false);
			// }, 300);
			// playWrong();
			//when the game is over apply style
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
		userPattern,
		setUserPattern,
		randomPattern,
		setRandomPattern,
		gameIsOver,
		setGameIsOver,
		stopGame,
		startGame,
		checkPattern,
		heading,
		setHeading,
		pickedWrongPattern,
		currentRandomColor,
		sounds,
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
