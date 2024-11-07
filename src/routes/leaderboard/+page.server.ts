// Mongo
import { User } from '@models/user.model';
import { connect, disconnect } from '$lib/server/mongo';
// Types
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	await connect()
	const models = await User.find()
	await disconnect()

	return { users: models.map(model => {
		const doc = model._doc
			doc.id = doc._id.toString()
			delete doc._id
			return doc
	}).filter(model => model.college) }
}