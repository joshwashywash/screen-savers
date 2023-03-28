import { add, type Vec2 } from './vector';

type Point = {
	position: Vec2;
	velocity: Vec2;
};

export type Polygon = Point[];

export const create =
	(x: () => number) =>
	(y: () => number) =>
	(count: number): Polygon => {
		const polygon: Polygon = [];
		let i = 0;
		while (i < count) {
			polygon.push({ position: [x(), y()], velocity: [0, 0] });
			i += 1;
		}
		return polygon;
	};

export const center = (polygon: Polygon): Vec2 => {
	let c: Vec2 = [0, 0];
	let i = 0;
	const { length } = polygon;
	while (i < length) {
		c = add(c)(polygon[i].position);
		i += 1;
	}
	return [c[0] / length, c[1] / length];
};

/**
 * assumes the polygon's points are absolutely positioned
 */
export const toString = (polygon: Polygon): string =>
	`M${polygon.map(({ position }) => position).join('L')}Z`;
