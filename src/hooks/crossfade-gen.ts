import { crossfade } from 'svelte/transition'
import type { CrossfadeParams, EasingFunction, TransitionConfig } from 'svelte/transition'


export type CrossfadeRes<T, K> = (node: T, params: CrossfadeParams & { key: K; }) => () => TransitionConfig

export const crossfadeGen = <T, K>(dur: number, ease: EasingFunction, transformer: (t: number, transform: string | null) => string): [CrossfadeRes<T, K>, CrossfadeRes<T, K>] => {
	return crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, _) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: dur,
				easing: ease,
				css: t => transformer(t, transform)
			}
		}
	})
}