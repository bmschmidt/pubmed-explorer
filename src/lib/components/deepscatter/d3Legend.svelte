<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { axisBottom } from 'd3-axis';
	export let scale: any;
	export let width: number = 640;
	export let height: number = 20;
	export let marginTop: number = 10;
	export let marginBottom: number = 30;
	export let ticks: number = 5;
	export let paddingLeft: number = 20;
	export let paddingRight: number = 20;

	import { select } from 'd3-selection';
	console.log({ FOOOOO: 'BARRRR' });
	let xAxisRef: SVGGElement;
	$: xScale = scaleLinear()
		.domain(scale.domain())
		.range([0, width - paddingLeft - paddingRight]);

	let gradientStops = [];
	$: if (scale.interpolator) {
		gradientStops = [];
		for (let i = 0; i < 100; i++) {
			gradientStops.push({
				offset: parseInt(i / (scale.range().length - 1)),
				color: scale.interpolator()(i / 100)
			});
		}
		gradientStops = gradientStops;
	}
	$: if (xAxisRef) {
		const xAxis = axisBottom(xScale).ticks(ticks);
		select(xAxisRef).call(xAxis);
	}
	$: {
		console.log(gradientStops);
	}
</script>

<svg
	width={width + paddingLeft + paddingRight}
	height={height + marginTop + marginBottom}
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
	style="background-color: rgb(250, 240, 230);"
>
	<defs>
		<linearGradient id="gradient">
			{#each gradientStops as { offset, color }}
				<stop offset="{offset}%" stop-color={color} />
			{/each}
		</linearGradient>
	</defs>
	<g transform="translate({paddingLeft}, {marginTop})">
		<rect width={width - paddingLeft - paddingRight} {height} fill="url(#gradient)" />
		<g class="axis" bind:this={xAxisRef} transform="translate(0, {height})" />
	</g>
</svg>

<style>
	.axis text {
		font-size: 10px;
	}
	.axis path,
	.axis line {
		fill: none;
		stroke: black;
		shape-rendering: crispEdges;
	}
	.axis.tick {
		stroke: black;
	}
</style>
