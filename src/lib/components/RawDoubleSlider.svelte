<script lang="ts">
	export let settings;
	export let target_min; // e.g. 'filter1.a'
	export let target_max; // e.g. 'filter1.b'
	export let min = 0;
	export let max = 1;
	export let step = 0.01;
	export let trans = 'linear';
	export let label = null;
	export let clone = [];
	export let api = {};
	import { get, set } from 'lodash-es';
	import DoubleSlider from './DoubleSlider.svelte';
	let value = 0.5;
	let number = min / 2 + max / 2;
	$: {
		let ratio = value;

		if (trans === 'sqrt') {
			ratio = Math.sqrt(value);
		}
		if (trans === 'log') {
			ratio = Math.pow(value, 2.718);
		}
		number = Math.floor(min + (max - min) * ratio);
	}
	function update() {
		const plot = settings.controls['_plot'];
		if (plot) {
			const call = {};
			let clonelist = [];
			if (typeof clone === 'string') {
				clonelist = [clone];
			} else {
				clonelist = [...clone];
			}
			for (let key of clonelist) {
				set(call, key, get(plot.query, key));
			}
			for (let [key, value] of Object.entries(api)) {
				set(call, key, value);
			}
			set(call, target, number);
			plot.plotAPI(call);
		}
	}

	const id = Math.random().toString(36).substring(2, 15);
	let start = 0;
	let end = 1;
</script>

<div>
	{#if label}<label for="#{id}">{label}: </label>{/if}
	<input type="range" {id} bind:value min="0" max="1" step={0.001} on:input={update} />
	{number}
</div>

<DoubleSlider bind:start bind:end />
