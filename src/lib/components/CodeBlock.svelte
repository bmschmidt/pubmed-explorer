<script>
	export let label;
	export let method;
	export let settings;
	export let args = [];
	function draw() {
		const plot = settings.controls['_plot'];
		if (plot) {
			plot[method](...args);
		}
	}
</script>

<div class="outline rounded hover:bg-gray-200" on:click={draw}>
	{label}
</div>
