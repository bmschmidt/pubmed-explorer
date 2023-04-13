<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}
</script>

<div class="fixed z-10 inset-0 overflow-y-auto mt-20">
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="fixed inset-0 transition-opacity" aria-hidden="true" on:click={closeModal}>
			<div class="absolute inset-0 bg-gray-500 opacity-75" />
		</div>

		<div
			class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
		>
			<div>
				<!-- Add your modal content here -->
				<h3 class="text-lg leading-6 font-medium text-gray-900">Credits/info</h3>
				<div class="text-gray-800">
					<p class="mt-2">
						This page is a collaboration between the <a href="http://www.eye-tuebingen.de/berenslab"
							>Berens lab at the University of Tübingen</a
						>
						and <a href="http://nomic.ai">Nomic</a>
						. It presents an online companion to the paper circulated as
						<a href="https://doi.org/10.1101/2023.04.10.536208"
							>The landscape of biomedical research</a
						>, by Rita Gonzalez-Marquez, Luca Schmidt, Benjamin M. Schmidt, Philipp Berens, and
						Dmitry Kobak.
					</p>
					<p>
						Gonzalez-Marquez, B. Schmidt, and Kobak prepared the online version: underlying code is
						at <a href="https://github.com/bmschmidt/pubmed-explorer"
							>https://github.com/bmschmidt/pubmed-explorer</a
						>
					</p>
					<p>
						Code for processing the data here and arranging it in two dimensions is at <a
							href="https://github.com/berenslab/pubmed-landscape"
							>https://github.com/berenslab/pubmed-landscape</a
						>
						The visualization engine to display points is
						<a href="https://github.com/nomic-ai/deepscatter">Deepscatter</a>, and
						<a href="https://www.npmjs.com/package/pandoc-svelte-components"
							>pandoc-svelte-components</a
						>
						is used to create a scrollable narration from
						<a
							href="https://raw.githubusercontent.com/bmschmidt/pubmed-explorer/main/src/scrollership/pubmed.md"
							>the underlying Markdown file.</a
						>
					</p>
				</div>
			</div>
			<div class="mt-5">
				<button
					type="button"
					class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					on:click={closeModal}>Close</button
				>
			</div>
		</div>
	</div>
</div>
