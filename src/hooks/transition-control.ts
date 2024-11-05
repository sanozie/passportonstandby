export type TransitionRes = (value: unknown) => void

export const transitionControl = () => {
	let transitionRes: TransitionRes | undefined = undefined
	const transition = new Promise((res, _) => {
		transitionRes = res
	})

	return [transitionRes, transition]
}
