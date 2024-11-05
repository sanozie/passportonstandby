import { browser } from '$app/environment';
import { writable } from 'svelte/store'

const init = browser ? window.localStorage.getItem('uid') ?? '' : '';

export const uid = writable(init)
uid.subscribe(value => {
	browser && window.localStorage.setItem('uid', value)
})
