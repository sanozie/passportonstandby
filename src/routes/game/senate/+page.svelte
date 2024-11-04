<script lang="ts">
	import USA from '@components/usa.svelte'

	let id = $state(null);
	let name = $state(null);

	$inspect(name);
</script>

<div class="flex flex-col">
	<USA bind:id={id} bind:name={name} />
	{#if id}
	<div class="flex flex-row w-full bg-gray-50 justify-center">
		<h1 class="inline">{name}</h1>
	</div>
	{/if}
</div>