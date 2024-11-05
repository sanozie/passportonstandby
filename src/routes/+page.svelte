<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { uid } from '@store'
	import { goto } from '$app/navigation';
	import { transitionControl } from '@hooks/transition-control';

	console.log('entering page')

	onMount(() => {
		console.log('uid exists')
		if ($uid) goto('/game')
	})

	let { form }: { form: ActionData } = $props();

	let progress: Promise<unknown> | undefined

	const navigate = async (result: boolean) => result && setTimeout(() => goto('/game'), 501)

	$effect(() => {
		console.log('effect triggered')
		if (form?.id) {
			uid.set(form?.id)
			navigate(form?.success!)
		}
	})
</script>

<div class="flex flex-row justify-center centerize w-full h-full">
	<div class="flex flex-col">
		<h1 class="title text-5xl">Passport on Standby</h1>
		<form method="POST" action="?/login" use:enhance>
			<div class="flex flex-row justify-center">
				<div class="flex flex-col">
					<div class="flex flex-row justify-center p-5">
						<div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
							<input name="name" type="text" placeholder="Enter your name" class="text text-center block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6">
						</div>
					</div>
					<button class="text bg-black rounded-md px-5 py-2 font-bold text-white text-sm">LOG IN</button>
				</div>


			</div>
		</form>
	</div>
</div>
