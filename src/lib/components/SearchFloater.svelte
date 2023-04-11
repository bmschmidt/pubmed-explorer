<script lang="ts">
	export let deepscatter;
	export let fields: string[];
	import apply_search from '$lib/stringsearch';
	// Are we currently running a search?
	$: previous_searches = ['brain', 'COVID', 'Coronavirus', 'visualization'];
	$: searching = false;
	$: field = fields[0];

	const dispatched_searches = new Set();

	let query = '';
	let expanded = false;

	function toggleSearchBar() {
		expanded = !expanded;
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			apply_search(query, field, 1000, deepscatter);
		}
	}

	let handlePath = 'M0 0 L1 1';
	let topCirclePath = 'M-1,-1 A 0.5 0.5 0 0 1 0 0 0,0';
	let bottomCirclePath = 'M-1,-1 A 0.5 0.5 0 0 0 0 0 0,0';

	$: if (expanded) {
		handlePath = 'M-1 -1 L1 1';
		topCirclePath = 'M0 0 L1 -1';
		bottomCirclePath = 'M0 0 L-1 1';
	} else {
		handlePath = 'M0 0 L1 1';
		topCirclePath = 'M-1,-1 A 0.5 0.5 0 0 1 0 0 0,0';
		bottomCirclePath = 'M-1,-1 A 0.5 0.5 0 0 0 0 0 0,0';
	}
</script>

<div
	id="searchbar"
	class="pointer-events-auto flex border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
	dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
	{expanded ? 'w-full' : 'w-24'} transition-all duration-600 mr-5"
>
	<div
		class="inset-y-0 left-0 flex items-center pl-3 pointer-events-auto w-12"
		on:click={toggleSearchBar}
		on:keyup={toggleSearchBar}
	>
		<svg
			aria-hidden="true"
			class="w-5 h-5 text-gray-500 dark:text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="-1.4 -1.4 2.8 2.8"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				class="handle transition-all duration-600"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="0.2"
				d={handlePath}
			/>
			<path
				class="top-circle transition-all duration-600"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="0.2"
				d={topCirclePath}
			/>
			<path
				class="bottom-circle transition-all duration-600"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="0.2"
				d={bottomCirclePath}
			/>
		</svg>
	</div>

	<input
		type="search"
		id="query"
		name="query"
		class="p-4 m-1 rounded-xl pl-10 text-sm text-gray-900 transition-all duration-600 origin-right transform {expanded
			? 'w-full'
			: 'w-0'}"
		placeholder="Search"
		on:input={(e) => (query = e.target.value)}
		on:focus={() => (expanded = true)}
		on:keydown={handleKeyDown}
	/>
	{#if expanded}
		<div class="mx-2">
			<select
				on:change={(e) => {
					field = e.target.value;
				}}
				class="py-4 p-1 m-1 rounded-xl text-sm text-gray-900 transition-all duration-600 origin-right transform w-full"
			>
				{#each fields as field}
					<option value={field}>{field}</option>
				{/each}
			</select>
		</div>
	{/if}
</div>
