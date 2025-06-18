import { useLayoutEffect, useState } from "react";
import "./App.css";
import rough from "roughjs";

import type { ToolType } from "./types";
import type { Drawable } from "roughjs/bin/core";
import ToolBar from "./components/ToolBar";

interface DrawableElem {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	roughElem: Drawable;
}

const App = () => {
	const [drawing, setDrawing] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [elems, setElems] = useState<DrawableElem[]>([]);
	const [activeTool, setActiveTool] = useState<ToolType>("Line");

	// ----------------- Might need to move this outside or useref
	const gen = rough.generator();

	const createElement = (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		type: ToolType
	): DrawableElem => {
		let roughElem = null;
		switch (type) {
			case "Line":
				roughElem = gen.line(x1, y1, x2, y2);
				break;
			case "Rectangle":
				roughElem = gen.rectangle(x1, y1, x2 - x1, y2 - y1);
				break;
			default:
				throw new Error("Wrong Type");
		}

		return { x1, y1, x2, y2, roughElem };
	};

	// -----------------

	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		if (canvas instanceof HTMLCanvasElement) {
			const ctx = canvas.getContext("2d");

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			// Clear the canvas
			ctx?.clearRect(0, 0, canvas.width, canvas.height);

			const roughCanvas = rough.canvas(canvas);

			elems.forEach(({ roughElem }) => {
				roughCanvas.draw(roughElem);
			});
		}
	}, [elems]);

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		setDrawing(true);
		const { clientX, clientY } = event;
		const roughtElem = createElement(
			clientX,
			clientY,
			clientX,
			clientY,
			activeTool
		);
		setElems(elems.concat(roughtElem));
	};

	const handleMouseUp = () => {
		setDrawing(false);
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (!drawing) {
			return;
		}

		const { clientX, clientY } = event;
		const tempElem = [...elems];
		const index = tempElem.length - 1;

		const { x1, y1 } = tempElem[index];
		tempElem[index] = createElement(x1, y1, clientX, clientY, activeTool);
		setElems(tempElem);
	};

	return (
		<>
			<canvas
				id="canvas"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			></canvas>
			<ToolBar setActiveTool={setActiveTool} />
		</>
	);
};

export default App;
