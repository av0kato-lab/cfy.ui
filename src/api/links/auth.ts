import { ApolloLink } from 'apollo-link'
import { GET_TOKEN } from 'api/gql/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DefaultStore } from 'api/store'

export default (cache: InMemoryCache) => {
	return new ApolloLink((operation, forward) => {
		try {
			const { token } = cache.readQuery({
				query: GET_TOKEN,
			}) as DefaultStore

			if (token) {
				operation.setContext({
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
			}
		} catch (err) {
			console.log(err.message)
		}

		return forward(operation)
	})
}
