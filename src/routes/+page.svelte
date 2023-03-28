<script lang="ts">
	import { center, create, toString } from '$lib/util/polygon';
	import { random } from '$lib/util/number';
	import { onDestroy, onMount } from 'svelte';
	import { add } from '$lib/util/vector';
	import { browser } from '$app/environment';

	const height = 9;
	const width = 16;
	const x = 0;
	const y = 0;

	const randomX = random(x)(x + width);
	const randomY = random(y)(y + height);
	const colors = ['#264653', '#e9c46a'];

	const scaleCount = 5;

	const f = 1 / scaleCount;
	const scales = Array.from({ length: scaleCount }, (_, i) => f * (1 + i));

	const maxPoints = 5;
	const r = random(3)(maxPoints);

	const minVelocity = 0.01;
	const maxVelocity = 0.1;
	const randomVelocity = random(minVelocity)(maxVelocity);

	const polygon = () => create(randomX)(randomY)(r());
	let polygons = Array.from(colors, () => polygon());
	for (const polygon of polygons) {
		for (const point of polygon) {
			point.velocity[0] = randomVelocity();
			point.velocity[1] = randomVelocity();
		}
	}

	let frameId = 0;
	const animate = () => {
		for (const polygon of polygons) {
			for (const point of polygon) {
				point.position = add(point.position)(point.velocity);
				if (point.position[0] > x + width || point.position[0] < x) {
					point.velocity[0] *= -1;
				}
				if (point.position[1] > y + height || point.position[1] < y) {
					point.velocity[1] *= -1;
				}
			}
		}
		polygons = polygons;
		frameId = window.requestAnimationFrame(animate);
	};

	$: ds = polygons.map((polygon) => toString(polygon));

	onMount(() => animate(frameId));
	onDestroy(() => {
		if (browser) window.cancelAnimationFrame(frameId);
	});
</script>

<main class="h-screen">
	<svg
		width="100%"
		height="100%"
		xmlns="http://www.w3.org/2000/svg"
		viewBox={`${x} ${y} ${width} ${height}`}
	>
		<defs>
			{#each ds as d, id}
				<symbol id={`${id}`}>
					<path {d} />
				</symbol>
			{/each}
		</defs>
		<rect x={0} y={0} fill="black" {width} {height} />
		<g stroke-width="{1 / 4}%" stroke-linejoin="round" stroke-linecap="round" fill="none">
			{#each polygons as polygon, id}
				{@const c = center(polygon)}
				{#each scales as scale}
					<use
						stroke={`${colors[id]}`}
						transform={`matrix(${scale}, 0, 0, ${scale}, ${c[0] - scale * c[0]}, ${
							c[1] - scale * c[1]
						})`}
						href={`#${id}`}
					/>
				{/each}
			{/each}
		</g>
	</svg>
</main>

<style>
	main {
		background: black;
	}
</style>
