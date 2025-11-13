"use client";
import { useGameContext } from "@/context/gameContext";

export default function ScoreDisplay() {
	const { name, score, highScore } = useGameContext();
	return (
		<div>
			<p>Name: {name || "Guest"}</p>
			<p>Score: {score}</p>
			<p>High Score: {highScore} </p>
		</div>
	);
}
