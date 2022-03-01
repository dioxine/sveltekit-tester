<script>
	let counter = 1;
	const adder = () => {
		return counter++;
	};
</script>

<button on:click={adder}>{counter}</button>
