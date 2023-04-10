<script lang="ts">
	export let deepscatter;
	import legend from './Observable-Legend';
	import ColorLegend from './d3Legend.svelte';
	import { onMount } from 'svelte';
	let scale;
	//	$: scale = deepscatter.dim('color').scale;
	let scaletype: null | 'ordinal' | 'numeric' = null;
	$: scaletype = scale ? scale.type : null;

	let nodeholder;
	function update() {
		console.log({ nodeholder });
		$: scale = deepscatter.dim('color').scale;
		console.log({ scale });
		if (scale) {
			legend(scale, nodeholder, { title: deepscatter.dim('color').field });
		}
	}
	onMount(() => {
		update();
	});
	deepscatter.add_hook('sidecolor', update, true);
</script>

{#if scale && scale.range && scale.range().length > 2}
	<div class="flex flex-col-reverse items-end">
		<div class="legend grid-cols-2 gap-2 m-2 items-end">
			{#each scale.domain() as d}
				<div class="legend-item">
					<div class="legend-color" style="background-color: {scale(d)}" />
					<div class="legend-label">{d}</div>
				</div>
			{/each}
		</div>
	</div>
{:else if scale && scale.range && scale.range().length == 2}
	<ColorLegend {scale} />
{/if}

<style>
	.quantlegend {
		@apply w-full h-20;
		@apply bg-blue-100 bg-opacity-50 rounded grid grid-cols-1 gap-1 p-1;
	}
	.legend {
		overflow-y: scroll;
		max-height: 80vh;
		pointer-events: auto;
		@apply bg-gray-100 bg-opacity-50 rounded grid grid-cols-1 md:grid-cols-2 gap-1 p-1;
	}
	.legend-item {
		display: flex;
		align-items: center;
	}
	.legend-color {
		width: 2rem;
		min-width: 2rem;
		height: 2rem;
		min-height: 2rem;
		margin-right: 0.5rem;
	}
</style>
