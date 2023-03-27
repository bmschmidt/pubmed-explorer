<script lang="ts">
	export let data;
	export let settings;
	import { Circle2 } from 'svelte-loading-spinners';
	import { enhance } from '$app/forms';
	import yaml from 'yaml';
	import Div from 'pandoc-svelte-components/Div.svelte';
	const [[id, classes, kv], elems] = data;

	const args = yaml.parse(elems);
	console.log({ args });

	console.log('CONTROLS', settings.controls);
	const attrs = Object.fromEntries(kv);
	console.log({ yaml });
	// Are we currently running a search?
	$: previous_searches = ['brain', 'COVID', 'Coronavirus', 'visualization'];
	$: searching = false;
	$: isValid = true;

	const dispatched_searches = new Set();
	async function apply_search(query, duration) {
		const plot = settings.controls._plot;
		if (!dispatched_searches.has(query)) {
			dispatched_searches.add(query);
			await run_search(query);
		}
		plot.plotAPI({
			duration,
			alpha: 50,
			encoding: {
				filter: null,
				color: {
					field: 'search: ' + query,
					domain: [0, 1],
					range: ['gray', 'orange']
				},
				size: {
					field: 'search: ' + query,
					domain: [0, 1],
					range: [1, 2]
				},
				foreground: {
					field: 'search: ' + query,
					op: 'eq',
					a: 1
				}
			}
		});
	}

	function encode_string(searchterm) {
		const arr = new Uint8Array(128);
		const encoder = new TextEncoder();
		encoder.encodeInto(searchterm, arr);
		return arr;
	}

	async function run_search(query) {
		const plot = settings.controls._plot;
		plot._root.transformations['search: ' + query] = async function (tile) {
			// First ensure it exists in duckdb.
			const encoded = encode_string(query);
			const key = tile.key;
			await tile.promise;
			const data = tile.record_batch.getChild('title').data[0];
			let match_start = 0;
			let match_length = 0;
			// The first zero in the buffer
			let target_length = encoded.findIndex((d) => d === 0);
			const matches = [];
			for (let i = 0; i < data.values.length; i++) {
				if (data.values[i] === encoded[match_length]) {
					match_length += 1;
					if (match_length === 1) {
						match_start = i;
					}
					if (match_length === target_length) {
						matches.push(match_start);
						match_length = 0;
					}
				} else {
					if (match_length > 0) {
						match_length = 0;
					}
				}
			}
			const output = new Float32Array(tile.record_batch.numRows);
			let offsets_index = 0;
			while (matches.length > 0) {
				const searching = matches.shift();
				while (data.valueOffsets[offsets_index + 1] < searching) {
					offsets_index += 1;
				}
				output[offsets_index] = 1;
			}
			return output;
		};
		searching = false;
		previous_searches = [...new Set([...previous_searches, query])];
	}

	async function run_serverside_search(query) {
		const plot = settings.controls._plot;
		searching = true;

		async function get_batch(tiles: string[]) {
			return fetch(args.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					field: args.field,
					db: 'pubmed',
					tiles,
					query
				})
			})
				.then((response) => response.arrayBuffer())
				.then((search_results) => {
					return new Uint8Array(search_results);
				});
		}
		plot._root.add_macrotiled_column(query, get_batch);
		searching = false;
		previous_searches = [...new Set([...previous_searches, query])];
	}

	const enhancer = ({ data, cancel }) => {
		const plot = settings.controls._plot;
		cancel();
		const query = data.get('query');
		var isValid = true;
		try {
			new RegExp(query);
		} catch (e) {
			isValid = false;
			searching = false;
			return;
		}

		const loaded_tiles = plot._root
			.map((d) => d)
			.filter((d) => d.ready)
			.map((d) => d.key);
		searching = true;
		apply_search(data.get('query'), 1000);
	};
</script>

<div class="anchor" id="searchbox" />

<form
	action="https://movies.benschmidt.org/project/search_regex"
	method="POST"
	use:enhance={enhancer}
	class="p-8"
>
	<label for="query" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Search</label
	>
	<div class="relative">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</div>
		<input
			type="search"
			id="query"
			name="query"
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Search By Regex"
			required
		/>
		<button
			type="submit"
			class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Search</button
		>
	</div>
</form>

{#if searching}
	<!--<div class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style="background: rgba(0, 0, 0, 0.3);">
</div>-->
	<div class="grid justify-center grid-cols-1 p-8">
		<div class="w-full">Gathering 20 million results to the browser...</div>
		<div class="w-full"><Circle2 /></div>
	</div>
{/if}
{#if !isValid}
	<div class="text-red red">Above is not a valid regular expression.</div>
{/if}
<div class="flex flex-row flex-wrap">
	{#each previous_searches as keyword}
		<div
			class="m-2 p-2 rounded-xl border bg-gray-100 hover:bg-gray-200"
			on:click={() => apply_search(keyword, 250)}
		>
			{keyword}
		</div>
	{/each}
</div>

<style>
	div.anchor {
		display: block;
		position: relative;
		top: -250px;
		visibility: hidden;
	}
</style>
