<script lang="ts">
	import { onMount } from 'svelte'
	import { quintOut } from 'svelte/easing'
	import { crossfadeGen } from '@hooks/crossfade-gen'

	import USA from '@components/usa.svelte'
	import Dem from '@components/dem.svelte'
	import Rep from '@components/rep.svelte'
	import { party } from '@utils/color'
	import { college, uid } from '@store'
	import { goto } from '$app/navigation';

	let id = $state(null)
	let name = $state(null)
	let states = $state({})
	let demFocus = $state(false)
	let repFocus = $state(false)
	let selections = $state($college)

	if (!$uid || $uid === '' || $uid === 'undefined') {
		goto('/')
	}


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
		college.set(selections)
		for (let [key, selection] of Object.entries(selections)) {
			states[key].style.fill = party[selection]
		}
	})

	$effect(() => {
		id && clear()
	})

	const [send, receive] = crossfadeGen(600, quintOut, (t, transform) => `
					transform: ${transform} scale(${t});
					opacity: ${t};
					max-height: ${t * 1000}px;
				`
	)
</script>

<div class="flex flex-col h-full w-full centerize max-w-screen-md">
	<div class="flex flex-row justify-center pt-10 bg-white w-full col-span-full row-span-full">
		<h1 class="font-black text-3xl md:text-5xl title">Select a state</h1>
	</div>
	<div class="flex flex-row bg-white w-full justify-center col-span-full row-span-full">
		<USA bind:id={id} bind:name={name} bind:elements={states} selections={selections} on:click={clear}/>
	</div>
	{#if id}
		<div in:send={{key: id}} out:receive={{key: id}} class="flex flex-row w-full justify-center p-5 sm:p-10 col-span-full row-span-full" >
			<div class="flex flex-col w-full">
				<div class="flex flex-row justify-center">
					<div class="flex flex-col p-5 sm:p-10 md:p-15 centerize max-w-[20vw]" on:click={dem}>
						<Dem focus={demFocus}/>
					</div>
					<div class="flex flex-col centerize" on:click={dem}>
						<h1 class="inline support text-2xl md:text-3xl text-center transition-colors" class:text-[#2743fa]={demFocus} class:text-[#ff4848]={repFocus}>{name}</h1>
					</div>
					<div class="flex flex-col p-5 sm:p-10 md:p-15 centerize max-w-[20vw]" on:click={rep}>
						<Rep focus={repFocus} />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
