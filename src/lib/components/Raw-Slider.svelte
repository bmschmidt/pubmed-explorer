<script lang="ts">
	export let settings;
	export let target_min;
	export let target_max;
	export let min = 0;
	export let max = 1;
	export let step = 0.01;
	export let trans = 'linear';
	export let label = null;
	export let clone = [];
	export let api = {};
	import { get, set } from 'lodash-es';
	import DoubleSlider from './DoubleSlider.svelte';
	let start = 0.25;
	let end = 0.75;
	let number_min = min;
	let number_max = max;
	$: {
		let ratio = start;

		if (trans === 'sqrt') {
			ratio = Math.sqrt(start);
		}
		if (trans === 'log') {
			ratio = Math.pow(start, 2.718);
		}
		number_min = Math.floor(min + (max - min) * ratio);

		let ratio2 = end;

		if (trans === 'sqrt') {
			ratio2 = Math.sqrt(end);
		}
		if (trans === 'log') {
			ratio2 = Math.pow(end, 2.718);
		}
		number_max = Math.floor(min + (max - min) * ratio2);
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
			set(call, target_min, number_min);
			set(call, target_max, number_max);
			plot.plotAPI(call);
		}
	}
	$: focused = false;
	$: {
		start;
		end;
		if (focused) {
			update();
		}
	}
	const id = Math.random().toString(36).substring(2, 15);
</script>

<div
	on:mouseover={() => (focused = true)}
	on:mouseout={() => (focused = false)}
	on:focus={() => (focused = true)}
	on:blur={() => (focused = false)}
>
	{#if label}<label for="#{id}">{label}: </label>{/if}
	{#if label === 'date'}
		{new Date(number_min).toISOString().slice(0, 10)}
	{:else}
		{number_min}
	{/if}
	–
	{#if label === 'date'}
		{new Date(number_max).toISOString().slice(0, 10)}
	{:else}
		{number_max}
	{/if}
	<DoubleSlider bind:start bind:end />
</div>
