<script>
	export let data;
	export let settings;
	import yaml from 'yaml';
	import RawDoubleSlider from './Raw-Slider.svelte';
	const [[id, classes, kv], elems] = data;
	const args = yaml.parse(elems);
</script>

<RawDoubleSlider {settings} {...args} />
