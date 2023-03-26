import type { Polygon } from '../types';

export const create =
	(x: () => number) =>
	(y: () => number) =>
	(count: number): Polygon => {
		const polygon: Polygon = [];
		let i = 0;
		while (i < count) {
			polygon.push([x(), y()]);
			i += 1;
		}
		return polygon;
	};

export const toRelative = (polygon: Polygon): Polygon => {
	const p: Polygon = polygon.slice(0, 1);
	let i = p.length;
	while (i < polygon.length) {
		const [x1, y1] = polygon[i - 1];
		const [x2, y2] = polygon[i];
		p.push([x2 - x1, y2 - y1]);
		i += 1;
	}
	return p;
};

/**
 * assumes the polygon is defined width relative points
 */
export const toRelativeString = (polygon: Polygon): string => `m${polygon.join('l')}z`;
