<script>
	export let data;
	export let settings;

	import ScrollershipCodeBlock from 'pandoc-svelte-components/custom/ScrollershipCodeBlock.svelte';

	if (process.env.NODE_ENV === 'development' && process.env.USER === 'ben') {
		const code = data[1].replace('https://static.nomic.ai/tiles/', 'http://localhost:8080/');
		data[1] = code;
	}
</script>

<ScrollershipCodeBlock {data} {settings} />
