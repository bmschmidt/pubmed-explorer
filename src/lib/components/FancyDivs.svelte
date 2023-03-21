<script lang="ts">
	export let settings;
	export let data;
	import { pack, hierarchy } from 'd3-hierarchy';
	import { browser } from '$app/environment';
	import { scaleLinear } from 'd3-scale';
	import { insert } from 'svelte/internal';

	class Hierarchy {
		constructor(key) {
			this.children = {};
			this.name = key;
		}
		insert(keylist) {
			if (keylist.length == 0) {
				this.value = this.value || 0;
				this.value += 1;
				return;
			}
			const key = keylist.shift();
			if (key in this.children) {
				this.children[key].insert(keylist);
			} else {
				this.children[key] = new Hierarchy(key);
				this.children[key].insert(keylist);
			}
		}
		to_d3_format() {
			const children = [];
			for (const [k, v] of Object.entries(this.children)) {
				children.push(v.to_d3_format());
			}
			return {
				name: this.name,
				value: this.value || undefined,
				children: children.length > 0 ? children : undefined
			};
		}
	}
	function prepare(scatterplot) {
		const h = new Hierarchy('root');
		for (const point of scatterplot._root.points()) {
			const { _topic_depth_1, _topic_depth_2, _topic_depth_3 } = point;
			h.insert([_topic_depth_1, _topic_depth_2, _topic_depth_3]);
		}
		const data = hierarchy(h.to_d3_format())
			.sum((d) => d.value)
			.sort((a, b) => b.value - a.value);

		console.log({ data });
		const root = pack().size([150, 150]).padding(3)(data);
		console.log({ root });
		const flatten = function (root) {
			const output = {};
			function recurse(node, parent) {
				if (node.children) node.children.forEach((child) => recurse(child, node));
				if (!node.data.name) return;
				if (output[node.data.name]) {
					if (node.r > output[node.data.name].r) {
						output[node.data.name] = {
							r: node.r,
							x: node.x,
							y: node.y,
							parent: parent ? parent.data.name : undefined
						};
					}
				} else {
					output[node.data.name] = {
						r: node.r,
						x: node.x,
						y: node.y,
						parent: parent ? parent.data.name : undefined
					};
				}
			}
			recurse(root, undefined);
			return output;
		};

		const flat = flatten(root);
		console.log(flat);

		const macher = function (depth, which) {
			return function (tile) {
				const output = new Float32Array(tile.record_batch.numRows);
				const rows = tile.record_batch.getChild(`_topic_depth_${depth}`).toArray();
				for (let i = 0; i < tile.record_batch.numRows; i++) {
					const d = rows[i];
					const node = flat[d];
					if (node === undefined) {
						continue;
					}
					const theta = ((i % 1000) / 1000) * 2 * Math.PI;
					let r = node.r;
					r = Math.sqrt(Math.random()) * r;

					output[i] = node[which] + r * (which == 'x' ? Math.sin(theta) : Math.cos(theta)) - 75;
				}
				return output;
			};
		};
		for (const depth of [1, 2, 3]) {
			scatterplot._root.transformations[`topic_${depth}.x`] = macher(depth, 'x');
			scatterplot._root.transformations[`topic_${depth}.y`] = macher(depth, 'y');
		}
	}
	if (browser) {
		function setup() {
			const scatterplot = settings.controls._plot;
			if (scatterplot) {
				prepare(scatterplot);
			} else {
				setTimeout(setup, 100);
			}
		}
		setTimeout(setup, 1000);
	}
</script>
