import { useMutation, useQuery } from '@apollo/react-hooks'
import { logoutOptions } from 'api/auth'
import { LOGOUT } from 'api/gql/auth'
import { GET_TOKEN } from 'api/gql/client'
import { UseQueryType } from 'api/store'

export const useLogout = () => {
	const [logout] = useMutation(LOGOUT, logoutOptions)
	return logout
}

export const useAuthState = () => {
	const {
		data: { token },
	} = useQuery(GET_TOKEN) as UseQueryType

	return !!token
}
