import { type Actions, fail } from '@sveltejs/kit';
import { connect, disconnect } from '$lib/server/mongo';
import { User } from '@models/user.model';

export const actions: Actions = {
	login: async (event) => {
		const data = await event.request.formData()
		const name = data.get('name')?.toString()
		if (!name) return fail(401, { errorMessage: 'Please provide a name.' })

		try {
			await connect()
			const model = await User.create({ name })
			await disconnect()

			return { success: true, id: model._doc._id.toString() }
		} catch (e) {
			return fail(401, { errorMessage: "Something broke bad fam. Tell Sam." })
		}
	}
}