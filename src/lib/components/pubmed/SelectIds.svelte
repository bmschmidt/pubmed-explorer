<script lang="ts">
	export let data;
	export let settings;
	import { Circle2 } from 'svelte-loading-spinners';

	$: selected_id_text =
		'37205355, 37051467, 36993635, 36993532, 36712140, 36711462, 36660179, 36610997, 36610989, 36494337, 36094956, 35607693, 35440782, 35273392, 35143775, 35132262, 34826233, 34616073, 34616066, 34417615, 34211145, 34103073, 33795888, 33676365, 33659468, 33303831, 33247933, 32942485, 32909008, 32701060, 32484809, 32176273, 32070398, 31873215, 31626771, 31455877, 31162708, 31073610, 30682053, 30664774, 30654736, 30566439, 30290149, 29967537, 29897334, 29650040, 28581496, 28545501, 28501650, 28448519, 27905880, 27875323, 27824834, 27621057, 27504780, 27230763, 27043002, 26683605, 26541607, 26531823, 26174866, 26061751, 26024968, 25765649, 25332375, 24936470, 24824901, 24558263, 24442673, 24314033, 23788555, 23677943, 23360652, 23222703, 23160280, 22815359, 22398619, 22383036, 22113004, 22099972, 21908772, 21728862, 21697122, 21642536, 21642531, 21410973, 21226895, 23089814, 21042592, 20856582, 20718980, 20686598, 20605923, 20436464, 20351773, 20052417, 19478997, 19289445, 18796475, 18779558, 18682743, 18447942, 18437230, 18353788, 17994088, 17994087, 17988176, 17874271, 17764440, 17571346, 17567995, 17538628, 17499477, 17433106, 17237099, 16789815, 16651369, 16600017, 16458514, 16354754, 16280538, 16110337, 16108706, 15911755, 15545499, 15534224, 15534223, 15215394, 15060015, 15060012, 15060007, 15059998, 15057822, 14988105, 14534169, 12935341, 12824358, 12824355, 12618381, 12610304, 12529311, 12529308, 12466850, 12015888, 12002220, 11997350, 11751581';
	$: ids = selected_id_text
		.split(/[\n\t ,]/) // Allow various delimiters
		.filter((d) => d.length);

	function run_search(ids) {
		const plot = settings.controls._plot;
		plot.plotAPI({
			duration: 250,
			max_points: 5e6,
			background_options: {
				size: [0.5, 30],
				mouseover: true,
				opacity: [0.8, 1e100]
			}
		});
		plot.select_data({
			name: `Selection ${Math.random().toString(16).slice(2)}`,
			ids,
			idField: 'pmid'
		});
	}

	async function pmFetch(term, field, size, start = 0) {
		const results = await fetch(
			`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}%5B${field}%5D&format=json&retstart=${start}&retmax=${size}`
		).then((d) => d.json());

		const idlist = results.esearchresult.idlist;
		if (results.esearchresult.count > start + size && start + size < 9998) {
			const next = await pmFetch(term, field, size, start + size);
			return [...idlist, ...next];
		}
		return idlist;
	}

	async function entrez_search(field, name) {
		let page = 0;
		current_name = name;
		const latest = await pmFetch(name, field, 1000, page);
		selected_id_text = latest.join(', ');
		run_search(latest);
	}

	const examples = {
		author: [
			'Lior Pachter',
			'Eric Lander',
			'Anthony Fauci',
			'Elizabeth Blackburn',
			'Craig Venter',
			'Sydney Brenner',
			'Francis Collins',
			'Solomon H. Snyder',
			'Randy Schekman',
			'Emmanuelle Charpentier',
			'Jennifer Doudna'
		],
		mesh: [
			'Child Nutrition Disorders',
			'Childhood Obesity',
			'Public Health Surveillance',
			'Rural Health Services',
			'Asthma, Exercise-Induced',
			'Geriatric Nutrition Disorders',
			'Depression, Postpartum',
			'Hypertension, Pregnancy-Induced',
			'Breast Neoplasms, Male',
			'Lung Cancer, Non-Small-Cell',
			'Alzheimer Disease, Early Onset',
			'Schizophrenia, Paranoid',
			'Coronavirus Infections, Severe Acute',
			'Cardiovascular Diseases, Congenital',
			'Mental Disorders, Treatment-Resistant'
		]
	};

	$: current_name = 'Anthony Fauci';
	$: search_field = 'author';
</script>

<div class="border shadow rounded">
	<textarea
		class="w-4/5 m-2 p-2"
		rows="5"
		bind:value={selected_id_text}
		placeholder="Enter pubmed ids
12341234, 423532133, 34256323
3212445"
		on:keydown={run_search}
	/>
	<button
		class="{ids.length > 0
			? 'active'
			: 'inactive'} bg-gray-200 hover:bg-gray-50 text-black py-2 px-4 rounded"
		on:click={run_search}>Display</button
	>
</div>
<div id="searches" class="m-2">
	<div id="searchwhat" class="relative inline-flex">
		<div class="m-2">
			Search <a href="https://www.ncbi.nlm.nih.gov/books/NBK3837/" target="_blank">PubMed Entrez</a>
			field:
		</div>
		<select
			bind:value={search_field}
			class="h-full pl-3 pr-10 py-2 text-base placeholder-gray-600 text-gray-900 bg-white rounded-lg focus:outline-none appearance-none"
		>
			<option value="author">Author</option>
			<option value="mesh">MeSH Terms</option>
		</select>
	</div>
	<div class="flex flex-wrap flex-row w-full">
		<input
			type="text"
			bind:value={current_name}
			class="w-3/5 l:w-4/5 m-2 p-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:border-blue-500"
		/>
		<button
			class="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 m-2 rounded"
			on:click={() => entrez_search(search_field, current_name)}
		>
			Search
		</button>
		{#each examples[search_field] as name}
			<div
				on:click={() => entrez_search(search_field, name)}
				on:keyup={() => entrez_search(search_field, name)}
				class="button outline rounded bg-gray-50 m-2 w-2/5 l:w-1/5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-300"
				class:underline={name === current_name}
				class:bg-blue-50={name === current_name}
			>
				{name}
			</div>
		{/each}
	</div>
</div>

<style>
	.button {
		@apply inline-block px-4 py-2 rounded-lg text-sm font-medium;
		cursor: pointer;
	}
</style>
