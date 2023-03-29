<script>
	export let settings;
	export let data;
	import time from '$lib/data/time.json';
	import lengths from '$lib/data/abstract_length.json';
	import { browser } from '$app/environment';
	import { scaleLinear } from 'd3-scale';
	import { extent } from 'd3-array';
	if (browser) {
		function prepare(scatterplot) {
			create_histogram('time', time, scatterplot);
			create_histogram('abstract_length', lengths, scatterplot);
		}
		function setup() {
			const scatterplot = settings.controls._plot;
			if (scatterplot) {
				prepare(scatterplot);
			} else {
				setTimeout(setup, 100);
			}
		}
		setup();
		function create_histogram(name, data, scatterplot) {
			console.log({ data });
			const col = [...Object.keys(data[0])].filter((d) => d !== 'count')[0];
			const lookup = {};
			data.forEach((d) => {
				lookup[d[col]] = d['count'];
			});
			const scalex = scaleLinear()
				.domain(extent(data, (d) => d[col]))
				.range([-250, 250]);
			const scaley = scaleLinear()
				.domain(extent(data, (d) => d['count']))
				.range([-150, 150]);
			scalex.clamp(true);
			scatterplot._root.transformations[`${name}.x`] = function (tile) {
				const vals = new Float32Array(tile.record_batch.numRows);
				const xvals = tile.record_batch.getChild(col);
				const xnum = extent(data, (d) => d[col])[1] - extent(data, (d) => d[col])[0];

				[...xvals].map((year, i) => {
					vals[i] = scalex(year) + ((Math.random() * 500) / xnum) * 0.75;
				});
				return vals;
			};
			scatterplot._root.transformations[`${name}.y`] = function (tile) {
				const vals = new Float32Array(tile.record_batch.numRows);
				const colvals = tile.record_batch.getChild(col);
				[...colvals].map((val, i) => {
					const height = scaley(lookup[val] * Math.random());
					vals[i] = -height;
				});
				return vals;
			};
			console.log({ lookup });
		}
	}
</script>
