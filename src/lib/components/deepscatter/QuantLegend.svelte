<script lang="ts">
	export let data;
	export let settings;
	export let scatterplot;
	import { browser } from '$app/environment';
	import { select } from 'd3-selection';
	import { interpolate, quantize, interpolateRound } from 'd3-interpolate';
	import { scaleLinear, scaleBand, scaleSequential } from 'd3-scale';
	import { range, quantile } from 'd3-array';
	import { axisBottom } from 'd3-axis';
	import { format as d3format } from 'd3-format';

  export let color : scaleLinear | scaleBand | scaleSequential;
	export let title;
  export let tickSize = 6;
  export let width = 1000;
  export let height = 66 + tickSize;
  export let ticks = 12;
  export let tickFormat = undefined;
  export let tickValues = undefined;

	const id = ('' + Math.random()).replaceAll('.', '');
  console.log("QUANT")
	tickSize = 6,
	width = 1000,
	height = 66 + tickSize,
	ticks = 12;
	tickFormat = undefined;
	tickValues = undefined;

  function ramp(color, n = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }


		const svg = select('#legend-' + id)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.style('overflow', 'visible')
			.style('display', 'block');
		let tickAdjust = (g) => g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
		let x;

		// Continuous
		if (color.interpolate) {
			const n = Math.min(color.domain().length, color.range().length);

			x = color.copy().rangeRound(quantize(interpolate(marginLeft, width - marginRight), n));

			svg
				.append('image')
				.attr('x', marginLeft)
				.attr('y', marginTop)
				.attr('width', width - marginLeft - marginRight)
				.attr('height', height - marginTop - marginBottom)
				.attr('preserveAspectRatio', 'none')
				.attr('xlink:href', ramp(color.copy().domain(quantize(interpolate(0, 1), n))).toDataURL());
		}

		// Sequential
		else if (color.interpolator) {
			x = Object.assign(
				color.copy().interpolator(interpolateRound(marginLeft, width - marginRight)),
				{
					range() {
						return [marginLeft, width - marginRight];
					}
				}
			);

			svg
				.append('image')
				.attr('x', marginLeft)
				.attr('y', marginTop)
				.attr('width', width - marginLeft - marginRight)
				.attr('height', height - marginTop - marginBottom)
				.attr('preserveAspectRatio', 'none')
				.attr('xlink:href', ramp(color.interpolator()).toDataURL());

			// scaleSequentialQuantile doesn’t implement ticks or tickFormat.
			if (!x.ticks) {
				if (tickValues === undefined) {
					const n = Math.round(ticks + 1);
					tickValues = range(n).map((i) => quantile(color.domain(), i / (n - 1)));
				}
				if (typeof tickFormat !== 'function') {
					tickFormat = d3format(tickFormat === undefined ? ',f' : tickFormat);
				}
			}
		}

		// Threshold
		else if (color.invertExtent) {
			const thresholds = color.thresholds
				? color.thresholds() // scaleQuantize
				: color.quantiles
				? color.quantiles() // scaleQuantile
				: color.domain(); // scaleThreshold

			const thresholdFormat =
				tickFormat === undefined
					? (d) => d
					: typeof tickFormat === 'string'
					? format(tickFormat)
					: tickFormat;

			x = scaleLinear()
				.domain([-1, color.range().length - 1])
				.rangeRound([marginLeft, width - marginRight]);

			svg
				.append('g')
				.selectAll('rect')
				.data(color.range())
				.join('rect')
				.attr('x', (d, i) => x(i - 1))
				.attr('y', marginTop)
				.attr('width', (d, i) => x(i) - x(i - 1))
				.attr('height', height - marginTop - marginBottom)
				.attr('fill', (d) => d);

			tickValues = range(thresholds.length);
			tickFormat = (i) => thresholdFormat(thresholds[i], i);
		}

		// Ordinal
		else {
			x = scaleBand()
				.domain(color.domain())
				.rangeRound([marginLeft, width - marginRight]);

			svg
				.append('g')
				.selectAll('rect')
				.data(color.domain())
				.join('rect')
				.attr('x', x)
				.attr('y', marginTop)
				.attr('width', Math.max(0, x.bandwidth() - 1))
				.attr('height', height - marginTop - marginBottom)
				.attr('fill', color);

			tickAdjust = () => {};
		}

		svg
			.append('g')
			.attr('transform', `translate(0,${height - marginBottom})`)
			.call(
				axisBottom(x)
					.ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined)
					.tickFormat(typeof tickFormat === 'function' ? tickFormat : undefined)
					.tickSize(tickSize)
					.tickValues(tickValues)
			)
			.call(tickAdjust)
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.append('text')
					.attr('x', marginLeft)
					.attr('y', marginTop + marginBottom - height - 6)
					.attr('fill', 'currentColor')
					.attr('text-anchor', 'start')
					.attr('font-weight', 'bold')
					.attr('class', 'title')
					.text(title)
			);

		return svg.node();
	}
	$: mylegend = undefined;

	if (browser) {
		function render(scatterplot) {
			if (scatterplot?.dim('color')?.scale) {
				mylegend = Legend(scatterplot.dim('color').scale, {
					title: scatterplot?.dim('color').field
				});
			}
		}
		function setup() {
			if (scatterplot) {
				// Regenerate the legend once per draw call.
				scatterplot.add_hook('legend', render);
			} else {
				setTimeout(setup, 100);
			}
		}
		setup();
	}
</script>

<svg
	width="1000"
	height="66"
	viewBox="0 0 1000 66"
	preserveAspectRatio="none"
	style="overflow: visible; display: block;"
/>
