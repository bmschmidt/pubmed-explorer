<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let hits: Number;
	export let scanned: Number;
	export let deepscatter;
	type Match = {
		ix: number;
		title: string;
		journal: string;
		year: number;
		pmid: number;
	};
	export let query;
	export let shown_matches: Match[];
	function zoom_to(point) {
		deepscatter._zoom.zoom_to(256, point.x, point.y);
	}
	$: start = 0;

	const itemsPerPage = 10;
	$: totalPages = Math.ceil(shown_matches.length / itemsPerPage);
	$: {
		if (currentPage > totalPages) {
			updatePage(totalPages);
		}
	}
	let currentPage = 1;
	function updatePage(page) {
		currentPage = page;
		start = (currentPage - 1) * itemsPerPage;
	}

	let searchResultsContainer;

	onMount(() => {
		searchResultsContainer.addEventListener('wheel', handleWheel, { passive: false });
		searchResultsContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
		searchResultsContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
	});

	onDestroy(() => {
		searchResultsContainer.removeEventListener('wheel', handleWheel);
		searchResultsContainer.removeEventListener('touchmove', handleTouchMove);
		searchResultsContainer.removeEventListener('touchstart', handleTouchStart);
	});

	function handleWheel(event) {
		event.stopPropagation();
	}

	function handleTouchMove(event) {
		event.stopPropagation();
	}

	function handleTouchStart(event) {
		event.stopPropagation();
	}
</script>

<div
	bind:this={searchResultsContainer}
	class="m-4 search-results flex flex-col absolute left-0 w-[55vw] overflow-y-auto"
>
	<div class="p-5 rounded-xl text-sm font-semibold text-gray-700 border-b border-gray-300">
		{hits.toLocaleString()} hits for
		<span class="font-bold text-red-900 font-mono">`{query}`</span>
		in {scanned.toLocaleString()} scanned records ({shown_matches.length.toLocaleString()}
		in view)
	</div>

	<!-- Pagination controls -->
	<div class="flex justify-center mt-4">
		<button
			class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-l transition-all duration-150"
			on:click={() => updatePage(currentPage - 1)}
			disabled={currentPage === 1}
		>
			Previous
		</button>
		<div class="px-3 py-1 text-sm text-gray-600 border-t border-b border-gray-300">
			Page {currentPage} of {totalPages}
		</div>
		<button
			class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-r transition-all duration-150"
			on:click={() => updatePage(currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			Next
		</button>
	</div>

	{#each shown_matches.slice(start, start + itemsPerPage) as match (match.ix)}
		<div class="result-item p-3 m-1 rounded-xl text-xs text-gray-900 flex flex-col space-y-2">
			<div class="text-left">
				{match.title}, <em>{match.journal}</em> ({match.year})
				<span
					class="underline cursor-pointer hover:text-gray-800 transition-all duration-150"
					on:click={() => window.open(`https://pubmed.ncbi.nlm.nih.gov/${match.pmid}`, '_blank')}
				>
					read on pubmed
				</span>
				<span
					class="underline cursor-pointer hover:text-gray-800 transition-all duration-150"
					on:click={() => zoom_to(match)}
				>
					zoom to point
				</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.search-results {
		@apply absolute left-0 w-[40vw] overflow-y-auto bg-gray-50;
		pointer-events: all;
	}
	.result-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.025);
	}
</style>
