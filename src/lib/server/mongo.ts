'use strict'
import mongoose from 'mongoose'
import { MONGODB_URI, NODE_ENV } from '$env/static/private'

const mongoConnection = {
	isConnected: 0,
};

export const connect = async () => {
	if (mongoConnection.isConnected === 1) return

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoConnection.isConnected === 1) return

		await mongoose.disconnect();
	}

	await mongoose.connect(MONGODB_URI ?? '', {
		dbName: NODE_ENV === 'production' ? 'prod' : 'dev',
	})
	mongoConnection.isConnected = 1
};

export const disconnect = async () => {
	if (NODE_ENV === 'development') return
	if (mongoConnection.isConnected === 0) return

	await mongoose.disconnect()
	mongoConnection.isConnected = 0
};