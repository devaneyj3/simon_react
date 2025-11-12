"use client";
import React, { useState } from "react";
import classes from "../styles/Game.module.scss";

export default function Game() {
	const [name, setName] = useState("");
	return <div className={classes.container}></div>;
}
