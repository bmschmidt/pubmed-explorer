<script>
	export let settings;
	export let data;
	import { browser } from '$app/environment';
	import { scaleLinear } from 'd3-scale';
	if (browser) {
		function prepare(scatterplot) {
			const codes = {
				'1971.0': 8973.0,
				'1972.0': 9688.0,
				'1973.0': 10157.0,
				'1974.0': 11795.0,
				'1975.0': 82592.0,
				'1976.0': 90857.0,
				'1977.0': 89368.0,
				'1978.0': 93519.0,
				'1979.0': 101743.0,
				'1980.0': 111520.0,
				'1981.0': 115237.0,
				'1982.0': 125132.0,
				'1983.0': 154058.0,
				'1984.0': 169149.0,
				'1985.0': 177678.0,
				'1986.0': 185768.0,
				'1987.0': 196091.0,
				'1988.0': 205881.0,
				'1989.0': 235845.0,
				'1990.0': 247136.0,
				'1991.0': 258748.0,
				'1992.0': 271171.0,
				'1993.0': 278471.0,
				'1994.0': 291234.0,
				'1995.0': 302785.0,
				'1996.0': 314494.0,
				'1997.0': 322994.0,
				'1998.0': 339422.0,
				'1999.0': 353828.0,
				'2000.0': 384587.0,
				'2001.0': 402554.0,
				'2002.0': 418586.0,
				'2003.0': 441483.0,
				'2004.0': 476520.0,
				'2005.0': 510666.0,
				'2006.0': 538617.0,
				'2007.0': 565325.0,
				'2008.0': 603121.0,
				'2009.0': 637794.0,
				'2010.0': 675315.0,
				'2011.0': 721317.0,
				'2012.0': 776096.0,
				'2013.0': 843818.0,
				'2014.0': 890136.0,
				'2015.0': 927110.0,
				'2016.0': 953637.0,
				'2017.0': 978063.0,
				'2018.0': 1029696.0,
				'2019.0': 1095240.0,
				'2020.0': 1415256.0,
				'2021.0': 1264918.0,
				'2022.0': 16856.0
			};

			const scalex = scaleLinear().domain([1970, 2022]).range([-250, 250]);
			const scaley = scaleLinear().domain([0, 1264918]).range([-150, 150]);
			scalex.clamp(true);
			scatterplot._root.transformations['time.x'] = function (tile) {
				const vals = new Float32Array(tile.record_batch.numRows);
				const years = tile.record_batch.getChild('year');
				[...years].map((year, i) => {
					const gap = (vals[i] = scalex(year) + Math.random() * 5);
				});
				return vals;
			};
			scatterplot._root.transformations['time.y'] = function (tile) {
				const vals = new Float32Array(tile.record_batch.numRows);
				const years = tile.record_batch.getChild('year');
				[...years].map((year, i) => {
					const y = `${year}.0`;
					const height = scaley(codes[y] * Math.random());
					vals[i] = -height;
				});
				return vals;
			};
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
	}
</script>
