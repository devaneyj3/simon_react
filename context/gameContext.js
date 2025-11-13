"use client";
import { createContext, useContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
	const [colorPressed, setColorPressed] = useState("");
	const [name, setName] = useState("");
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [userPattern, setUserPattern] = useState([]);
	const [randomPattern, setRandomPattern] = useState([]);
	const [gameIsOver, setGameIsOver] = useState(false);

	const values = {
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
