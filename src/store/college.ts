import { writable } from 'svelte/store'
import { browser } from '$app/environment';

const init = browser ? JSON.parse(window.localStorage.getItem('college')!) ?? {} : {};

export const college = writable(init)
college.subscribe(async value => {
	browser && window.localStorage.setItem('college', JSON.stringify(value))
	await fetch('/api/college', {
		method: 'POST',
		body: JSON.stringify({
			entries: value,
			id: browser && window.localStorage.getItem('uid')
		})
	})
})