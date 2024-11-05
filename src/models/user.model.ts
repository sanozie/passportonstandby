import mongoose from 'mongoose'
import type { ObjectId, Model } from 'mongoose'

export interface UserModel {
	name: string
	college: Record<string, string>
}

const UserSchema = new mongoose.Schema(
	{
		name: String,
		college: Object
	},
	{ collection: 'user' }
)

export const User = mongoose.models.User || mongoose.model('User', UserSchema, 'user')
