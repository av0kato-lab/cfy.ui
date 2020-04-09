import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage } from 'apollo-cache-persist/types'

import { resolvers } from './schema'
import auth from './links/auth'
import error from './links/error'
import logger from './links/logger'
import store from './store'

const cache = new InMemoryCache()
const cacheKey = 'apollo-cache'

const writeInitialStore = () => {
	return new Promise(resolve => {
		cache.writeData({
			data: store,
		})
		resolve()
	})
}

const httpLink = new HttpLink({
	uri: '/api',
})

export const client = new ApolloClient({
	cache,
	link: from([logger, error, auth(cache), httpLink]),
	resolvers,
	// connectToDevTools: true,
	defaultOptions: {
		mutate: {
			// errorPolicy: 'ignore',
		},
	},
})

client.onResetStore(writeInitialStore)

export const init = async () => {
	await persistCache({
		cache,
		storage: window.localStorage as PersistentStorage<any>,
		// debug: true,
		debounce: 300,
		key: cacheKey,
	})

	let store: any = localStorage.getItem(cacheKey)

	if (store) {
		try {
			store = JSON.parse(store)
			if (!Object.keys(store).length) {
				writeInitialStore()
			}
		} catch (err) {
			console.error(err)
		}
	} else {
		writeInitialStore()
	}

	return client
}
