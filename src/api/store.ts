interface User {
	__typename: string
}

interface Log {
	message: string
	id: string
}

export interface DefaultStore {
	token: string | null
	logs: Log[]
	user: User
}

export interface UseQueryType {
	data: DefaultStore
}

const store: DefaultStore = {
	token: null,
	logs: [],
	user: {
		__typename: 'UserQueryType',
	},
}

export default store
