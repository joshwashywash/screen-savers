export type Vec2 = [x: number, y: number];

export const add =
	(a: Vec2) =>
	(b: Vec2): Vec2 =>
		[a[0] + b[0], a[1] + b[1]];
