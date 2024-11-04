<script lang="ts">
	import USA from '@components/usa.svelte'
	import Dem from '@components/dem.svelte'
	import Rep from '@components/rep.svelte'
	import { party } from '@utils/color'

	let id = $state(null)
	let name = $state(null)
	let states = $state({})
	let demFocus = $state(false)
	let repFocus = $state(false)
	let selections = $state({})

	const dem = () => {
		selections[id!] = 'dem'
		demFocus = !demFocus
		repFocus = false
	}

	const rep = () => {
		selections[id!] = 'rep'
		repFocus = !repFocus
		demFocus = false
	}

	const clear = () => {
		demFocus = false
		repFocus = false
	}

	$effect(() => {
		for (let [key, selection] of Object.entries(selections)) {
			states[key].style.fill = party[selection]
		}
	})

	$effect(() => {
		id && clear()
	})
</script>

<div class="flex flex-col">
	<USA bind:id={id} bind:name={name} bind:elements={states} on:click={clear}/>
	{#if id}
		<div class="flex flex-row w-full bg-gray-50 justify-center">
			<div class="flex flex-col w-full">
				<div class="flex flex-row justify-center">
					<div class="flex flex-col text-center">
						<p>Predict the Outcome</p>
						<h1 class="inline">{name}</h1>
					</div>
				</div>
				<div class="flex flex-row justify-center">
					<div class="flex flex-col" on:click={dem} class:bg-[#2743fa]={demFocus}>
						<Dem focus={demFocus}/>
					</div>
					<div class="flex flex-col" on:click={rep} class:bg-[#ff4848]={repFocus}>
						<Rep focus={repFocus} />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
