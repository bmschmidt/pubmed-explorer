<script>
	export let scatterpromise;
	import Legend from '$lib/components/deepscatter/Legend.svelte';

	$: show = false;
</script>

<div class="grid grid-cols-2 w-full">
	{#await scatterpromise then deepscatter}
		<div class="flex flex-col gap-3 w-1/8">
			<button
				on:click={() => {
					show = !show;
				}}>Search</button
			>
		</div>
		<div class="flex flex-col gap-3">
			<button
				on:click={() => {
					show = !show;
				}}
			>
				Legend
			</button>
			<div class="w-full legend-panel overflow-y-scroll">
				{#if show}
					<Legend {deepscatter} />
				{/if}
			</div>
		</div>
	{/await}
</div>

<style>
	button {
		display: block;
		pointer-events: auto;
		@apply mx-3 px-20 py-3 rounded hover:bg-blue-100 bg-blue-50;
	}
	/* The hidden divs should be below the buttons but not change their layout  */
	.legend-panel {
		@apply z-10;
	}
</style>
