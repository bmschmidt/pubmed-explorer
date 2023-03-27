<script>
	export let scatterpromise;
	import Legend from '$lib/components/deepscatter/Legend.svelte';
	import Search from './SearchFloater.svelte';
	$: show = undefined;
</script>

<div class="flex flex-col justify-between h-[calc(100vh-74px)] pointer-events-none">
	{#await scatterpromise then deepscatter}
		<div class="flex flex-col gap-3 pointer-events-none items-end h-full">
			<Search {deepscatter} />
			<div
				id="legend"
				class="flex flex-grow flex-col-reverse gap-3 mb-3 h-[50vh] w-[50vw] items-end bottom-0"
			>
				<button
					class="pointer-events-auto"
					on:click={() => {
						show === 'legend' ? (show = undefined) : (show = 'legend');
					}}
				>
					Legend
				</button>

				<div
					class="w-full legend-panel overflow-y-scroll hidden flex-col-reverse flex"
					class:visible={show === 'legend'}
					class:pointer-events-auto={show === 'legend'}
				>
					{#if show === 'legend'}
						<Legend {deepscatter} />
					{/if}
				</div>
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
	#holder {
		min-height: calc(50vh - 3rem);
	}
	.visible {
		display: block;
	}
</style>
