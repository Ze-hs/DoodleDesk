export const Tools = ["Line", "Rectangle"] as const;
export type ToolType = (typeof Tools)[number];
