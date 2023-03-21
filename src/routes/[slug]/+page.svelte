<script lang="ts">
	export let data;
	const { document } = data;
	import API from '$lib/deepscatter.js';
	import Scrollership from 'pandoc-svelte-components/custom/ScrollershipWrapper.svelte';
	import { page } from '$app/stores';
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

	const controls = {
		'codeblock.method': CallMethod,
		'codeblock.dropdown': Dropdown,
		'codeblock.search': Search,
		'codeblock.callmethod': CallMethod,
		'codeblock.slider': Slider,
		'codeblock.api': ScrollershipCodeBlockWrapper,
		'div.legend': Legend,
		'div.barchartprep': SpecialCode,
		'div.fancydiv': FancyDivs
	};

	const { slug } = $page.params;
	let promiser = null;
	const scatterpromise = new Promise((resolve) => {
		promiser = resolve;
	});
</script>

<Scrollership {controls} {API} ast={document} position={'left'} {promiser}>
	<div slot="custom-navbar" class="header">
		<div class="shrink" />
		<div class="title">
			{document.meta.title.c.map((d) => d.c).join(' ')}
		</div>
		<div class="logos">
			<div class="logo">
				<a href="http://nomic.ai/"
					><img
						src="https://static.nomic.ai/assets/nomic_with_transparent.png"
						alt="Nomic logo"
					/></a
				>
			</div>
			{#if slug === 'pubmed'}
				<div class="logo">
					<a href="https://www.eye-tuebingen.de/berenslab/">
						<img
							alt="Tübingen University Data Science for Vision Research logo"
							src="https://www.eye-tuebingen.de/fileadmin/templates/fia2012/img/fia2021/fia-ukt_fia_sublogo_ci2019-300-flach.gif"
						/>
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div slot="control-items" id="controls">
		<Controls {scatterpromise} />
	</div>
</Scrollership>

<style>
	#controls {
		pointer-events: auto;
	}
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
