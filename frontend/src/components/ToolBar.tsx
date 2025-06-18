import type { ToolType } from "../types";
import { Tools } from "../types";

type ToolBarProps = {
	setActiveTool: (tool: ToolType) => void;
};

const ToolBar = ({ setActiveTool }: ToolBarProps) => {
	const handleToolClick = (tool: ToolType) => {
		setActiveTool(tool);
	};

	return (
		<div id="toolbar">
			{Tools.map((tool) => (
				<button
					key={tool}
					onClick={() => {
						handleToolClick(tool);
					}}
				>
					{tool}
				</button>
			))}
		</div>
	);
};

export default ToolBar;
