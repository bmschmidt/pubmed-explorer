<script lang="ts">
	export let datum = {};
	export let visible = true;
	export let filter_field;
	export let filter_value;
	async function short_text(title) {
		// uri encode title
		const encoded_title = encodeURIComponent(title);
		const r = await fetch(
			`//en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${encoded_title}`
		)
			.then((d) => d.json())
			.then((d) => {
				const pages = d.query.pages;
				const page = pages[Object.keys(pages)[0]];
				return page.extract;
			});
		return r;
	}

	$: console.log();
	import { FilterIcon, ToggleLeftIcon } from 'svelte-feather-icons';

	const dstring = (date) => (date ? date.toString().slice(0, 15) : 'NA');
	const index_fields = [
		{
			label: 'title',
			f: 'title',
			filter: true
		},
		{
			label: 'topic_top_20',
			f: 'topic_top_20',
			filter: true
		},
		{
			label: 'id',
			f: 'id',
			filter: false
		},
		{
			f: 'topic_top_50',
			label: 'topic_top_50',
			filter: true
		},
		{
			f: 'topic_top_100',
			label: 'topic_top_100',
			filter: true
		}
	];
	function toggle_filter(f, value) {
		filter_field = filter_field === f ? null : f;
		filter_value = filter_value === value ? null : value;
		console.log({ f, value });
	}
</script>

<div
	class:hidden={!visible}
	class="transition p-4 bg-gray-200/50 rounded fixed top-0 left-0 m-3 w-2/5"
>
	<div class="rounded-t-md bg-orange-200 text-l text-gray-700 font-mono inline text-center p-2">
		{datum.title}
	</div>

	<div class="rounded-b-md rounded-tr-md bg-orange-200 p-3">
		<details>
			<summary>
				<div class="text-xl font-bold mb-4">
					{datum.title}
				</div>
			</summary>

			<div id="wikitext" class="outline p-3 m-2">
				{#await short_text(datum['title']) then text}
					{@html text}
				{/await}
			</div>
			<dl>
				<div class="grid grid-cols-3 gap-y-4 inline">
					{#each index_fields as { label, f, filter, date }}
						<dt class="text-gray-700 text-sm font-mono font-bold">{label}</dt>
						<dd class="text-gray-700 text-sm font-mono">
							{#if date}
								{dstring(datum[f])}
							{:else if datum[f]}
								<div class="float float-row" />
								<div class="inline">{datum[f]}</div>
								<div on:click={() => toggle_filter(f, datum[f])} class="float-right ">
									<FilterIcon
										class="hover:stroke-2 stroke-1 hover:stroke-gray-700 transition duration-300 stroke-gray-500 {filter_field ==
										f
											? 'fill-gray-500'
											: 'fill-transparent'}"
										size="30"
									/>
								</div>
							{:else}
								???
							{/if}
						</dd>
					{/each}
				</div>
			</dl>
		</details>
	</div>
</div>

<style>
	dd {
		@apply col-span-2;
	}
</style>
