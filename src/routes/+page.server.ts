import { type Actions, fail } from '@sveltejs/kit';
import { connect, disconnect } from '$lib/server/mongo';
import { User } from '@models/user.model';

export const actions: Actions = {
	login: async (event) => {
		console.log('inside login')
		const data = await event.request.formData()
		const name = data.get('name')?.toString()
		if (!name) return fail(401, { errorMessage: 'Please provide a name.' })

		console.log('creating user')
		try {
			await connect()
			const model = await User.create({ name })
			await disconnect()

			console.log('uid', model._doc._id.toString())

			return { success: true, id: model._doc._id.toString() }
		} catch (e) {
			return fail(401, { errorMessage: "Something broke bad fam. Tell Sam." })
		}
	}
}