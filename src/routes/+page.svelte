<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { uid } from '@store'
	import { goto } from '$app/navigation';
	import { transitionControl } from '@hooks/transition-control';

	onMount(() => {
		if ($uid) goto('/game')
	})

	let { form }: { form: ActionData } = $props();

	let progress: Promise<unknown> | undefined

	const navigate = async (result: boolean) => result && setTimeout(() => goto('/game'), 501)

	$effect(() => {
		uid.set(form?.id)
		navigate(form?.success!)
	})
</script>

<div class="flex flex-row justify-center centerize w-full h-full">
	<div class="flex flex-col">
		<h1>Passport on Standby</h1>
		<form method="POST" action="?/login" use:enhance={() => {
			let [mountOutroRes, mountOutro] = transitionControl()
				progress = mountOutro
				if (form) form.errorMessage = undefined

				return async ({ update }) => {
						await update()
						setTimeout(() => mountOutroRes() ?? null, 499)
				}
		}}>
			<label>
				Name
				<input name="name" type="text" placeholder="Donald Harris">
			</label>
			<button>Log in</button>
		</form>
	</div>
</div>
