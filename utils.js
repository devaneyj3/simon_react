export const COLORS = ["red", "yellow", "green", "blue"];

let level = 1;

const pattern = [];
export const randomColor = () => {
	const randomNum = Math.floor(Math.random() * COLORS.length);
	const color = COLORS[randomNum];
	pattern.push(color);
	return pattern;
};

export const runGame = () => {
	// choice == patern keep going
	const color = randomColor();
	console.log("Computer pattern is,", color);
};
