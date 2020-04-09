import { client } from '.'
import { LOGOUT } from 'api/gql/auth'
import { GET_TOKEN } from 'api/gql/client'

export const logoutOptions = {
	mutation: LOGOUT,
	// refetchQueries: [{ query: GET_AUTH }],
	// awaitRefetchQueries: true,
	update() {
		client.writeQuery({
			query: GET_TOKEN,
			data: { token: null },
		})
	},
	onCompleted() {
		client.resetStore()
	},
}

export const forceLogout = () => {
	client.writeQuery({
		query: GET_TOKEN,
		data: { token: null },
	})
	client.resetStore()
}

export const logout = () => client.mutate(logoutOptions)
