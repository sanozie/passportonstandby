import { connect, disconnect } from '$lib/server/mongo';
import { User } from '@models/user.model';

import type { RequestHandler } from './$types'

export const POST = (async ({ request }) => {
	const { entries, id } = await request.json()
	if (!id) throw new Error('Request without id')

	await connect()
	await User.findOneAndUpdate({ _id: id}, { college: entries, timestamp: new Date() })
	await disconnect()


	return new Response()
}) satisfies RequestHandler