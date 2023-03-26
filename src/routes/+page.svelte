<script lang="ts">
	import { create, toRelative, toRelativeString } from '$lib/util/polygon';
	import { random } from '$lib/util/number';

	const length = 1;
	const x = 0;
	const y = 0;

	const randomX = random(x)(x + length);
	const randomY = random(y)(y + length);

	const triangle = () => create(randomX)(randomY)(3);

	let t = triangle();

	$: d = toRelativeString(toRelative(t));
</script>

<button
	on:click={() => {
		t = triangle();
	}}
>
	regenerate
</button>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {length} {length}">
	<path stroke-width="1%" stroke-linejoin="round" fill="none" stroke="black" {d} />
</svg>
