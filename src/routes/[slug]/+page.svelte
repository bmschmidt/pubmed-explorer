<script lang="ts">
	export let data;
	const { document } = data;
	import API from '$lib/deepscatter.js';
	import Scrollership from 'pandoc-svelte-components/custom/ScrollershipWrapper.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	// Can return a promise for a constructor to avoid
	// browser-only problems.
	import CallMethod from '$lib/components/CallMethod.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Search from '$lib/components/Search.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import Legend from '$lib/components/ColorLegend.svelte';
	import SpecialCode from '$lib/components/SpecialCode.svelte';
	import FancyDivs from '$lib/components/FancyDivs.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import ScrollershipCodeBlockWrapper from '$lib/components/ScrollershipCodeBlockWrapper.svelte';
	import RangeSlider from '$lib/components/RangeSlider.svelte';
	import pmidsearch from '$lib/components/pubmed/SelectIds.svelte';

	const controls = {
		'codeblock.method': CallMethod,
		'codeblock.dropdown': Dropdown,
		'codeblock.search': Search,
		'codeblock.callmethod': CallMethod,
		'codeblock.slider': Slider,
		'codeblock.double-slider': RangeSlider,
		'codeblock.api': ScrollershipCodeBlockWrapper,
		'div.legend': Legend,
		'div.pmidsearch': pmidsearch,
		'div.barchartprep': SpecialCode,
		'div.fancydiv': FancyDivs
	};

	const { slug } = $page.params;
	let promiser = null;
	const scatterpromise = new Promise((resolve) => {
		promiser = resolve;
	});
	let about_modal = false;
</script>

<div id="scrollershipwrapper" class="-mt-4">
	<Scrollership {controls} {API} ast={document} position={'left'} {promiser}>
		<div slot="custom-navbar" class="header">
			<div id="about">
				<!--Toggle for the about modal-->
				<button
					class="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#aboutModal"
					on:click={() => {
						about_modal = !about_modal;
					}}
				>
					About
				</button>
			</div>

			<div class="shrink" />
			<div class="title">
				{document.meta.title.c.map((d) => d.c).join(' ')}
			</div>
			<div class="logos">
				<div class="logo">
					<a href="https://www.eye-tuebingen.de/berenslab/">
						<img alt="Tübingen University logo" src="UniversitaetTuebingen_WortBildMarke.png" />
					</a>
				</div>
				<div class="logo mx-8">
					<a href="http://nomic.ai/"><img src="nomic_with_transparent.png" alt="Nomic logo" /></a>
				</div>
			</div>
		</div>

		<div id="aboutModal">
			<div class="modal-dialog modal-dialog-centered" />
		</div>
		<div slot="control-items" id="controls" class="pointer-events-none">
			<Controls {scatterpromise} />
		</div>
	</Scrollership>
</div>

<style>
	.shrink {
		flex-grow: 2;
	}
	.title {
		flex-grow: 4;
		margin: auto;
		font-size: 24pt;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.logos {
		display: flex;
		flex-direction: row;
	}
	.logo {
		max-height: 48px;
	}
	.logo > a > img {
		max-height: 48px;
	}
</style>
