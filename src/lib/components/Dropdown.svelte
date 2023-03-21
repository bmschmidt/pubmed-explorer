<script lang="ts">
	export let settings;
	import categories_raw from '$lib/categories.json?raw';
	export let starting = [];

	$: selections = starting;

	const values = JSON.parse(categories_raw);
	let proposed = '';

	$: possibilities = values.filter((d) => d.toLowerCase().match(proposed.toLowerCase()));

	$: select_input = '';
	function update() {
		const plot = settings.controls['_plot'];
		if (plot) {
			const list = JSON.stringify(selections);
			const lambda = `d => ${list}.includes(d)`;
			console.log(lambda);
			const call = {
				alpha: 1e6,
				point_size: 5,
				encoding: {
					filter: {
						field: 'category',
						lambda
					}
				}
			};
			plot.plotAPI(call);
		}
	}
	function accept_input() {
		selections = [...selections, select_input];
		update();
	}
	function drop(selection) {
		selections = selections.filter((d) => d !== selection);
		update();
	}
</script>

<div>
	<input class="my-2" type="text" bind:value={proposed} />
	<div class="my-2">
		{#if proposed !== ''}
			<select name="cars" id="cars" bind:value={select_input} on:change={accept_input}>
				{#each possibilities.slice(0, 20) as p}
					<option value={p}>{p}</option>
				{/each}
			</select>
		{/if}
	</div>
	<div class="flex flex-row flex-wrap">
		{#each selections as selection}
			<div class="flex flex-row rounded-full border m-2 bg-gray-300">
				<div class="mx-2">
					{selection}
				</div>
				<div on:click={() => drop(selection)} class="hover:bg-gray-900 hover:text-white px-3 mx-2">
					x
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
