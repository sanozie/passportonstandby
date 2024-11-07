<script lang="ts">
	import USA from '@components/usa.svelte'
	import { party } from '@utils/color'

	let { data } = $props()

	const result = {
		AL: 'rep',
		AK: 'rep' ,
		AR: 'rep',
		AZ: 'rep',
		CA: 'dem',
		CO: 'dem',
		CT: 'dem',
		DE: 'dem',
		DC: 'dem',
		FL: 'rep',
		GA: 'rep',
		HI: 'dem',
		ID: 'rep',
		IL: 'dem',
		IN: 'rep',
		IA: 'rep',
		KS: 'rep',
		KY: 'rep',
		LA: 'rep',
		ME: 'dem',
		MD: 'dem',
		MA: 'dem',
		MI: 'rep',
		MN: 'dem',
		MS: 'rep',
		MO: 'rep',
		MT: 'rep',
		NE: 'rep',
		NH: 'dem',
		NJ: 'dem',
		NM: 'dem',
		NY: 'dem',
		NC: 'rep',
		NV: 'rep',
		ND: 'rep',
		OH: 'rep',
		OK: 'rep',
		OR: 'dem',
		PA: 'rep',
		RI: 'dem',
		SC: 'rep',
		SD: 'rep',
		TN: 'rep',
		TX: 'rep',
		UT: 'rep',
		VT: 'dem',
		VA: 'dem',
		WA: 'dem',
		WV: 'rep',
		WI: 'rep',
		WY: 'rep'
	}

	let submission = $state(result)
	let states = $state({})
	const frequency = {}

	const score = (submission) => {
		return Object.entries(result).reduce((a, [k, v]) => a + (submission[k] === v ? 1 : 0), 0)
	}

	const sorter = () => {
		const final = []
		for (let user of data.users) {
			frequency[score(user.college)] = frequency[score(user.college)] ? [ ...frequency[score(user.college)], user] : [user]
		}

		const scores = Object.keys(frequency).sort((a, b) => b - a)

		for (let score of scores) {
			final.push(...frequency[score].sort((a, b) => a.timestamp - b.timestamp))
		}

		return final
	}

	const clear = () => {
		for (let [key, element] of Object.entries(states)) {
			element.style.fill = '#ffffff'
		}
	}

	$effect(() => {
		clear()
		for (let [key, selection] of Object.entries(submission)) {
			states[key].style.fill = party[selection]
		}
	})
</script>


<div class="flex flex-col h-full w-full">
	<div class="flex flex-row justify-center p-10">
		<h1 class="title text-3xl md:text-5xl">Leaderboard</h1>
	</div>

	<div class="flex flex-col md:flex-row grow py-5 px-10 w-full">
		<!--Table-->
		<div class="flex flex-col rounded-3xl bg-gray-100 py-5 overflow-y-auto max-h-[40vh] md:max-h-[100vh]">
			<div class="flex flex-row justify-center ">
				<span class="support text-center">Called State Count: {Object.keys(result).length}</span>
			</div>
			<div class="flex flex-row justify-center ">
				<div class="flex flex-col px-3">
					<span class="text">Election Results</span>
				</div>
				<div class="flex flex-col px-3 justify-center items-center" on:click={() => submission = result}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
						<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
					</svg>
				</div>
			</div>
			{#each sorter() as user (user.id)}
				<div class="flex flex-row justify-center">
					<div class="flex flex-col px-3 basis-1/6">
						<span class="support">{score(user.college)}</span>
					</div>
					<div class="flex flex-col px-3 basis-1/3">
						<span class="text">{user.name}</span>
					</div>
					<div class="flex flex-col px-3 basis-1/6">
						<span class="text">{user.timestamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "America/Los_Angeles" })}</span>
					</div>
					<div class="flex flex-col px-3 justify-center items-center basis-1/6" on:click={() => submission = user.college}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
							<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
					</div>
				</div>
			{/each}
		</div>
		<!--USA Display-->
		<div class="flex flex-col w-full centerize">
			<div class="flex flex-row bg-white w-full justify-center col-span-full row-span-full pb-20">
				<USA bind:elements={states} interactive={false}/>
			</div>
		</div>
	</div>
</div>