import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from 'api/gql/user'

const Profile: React.FC = () => {
	const { data, loading, error, networkStatus } = useQuery(GET_USER)

	return (
		<section>
			<h1>Profile page!</h1>
			<div>Error: {error?.message}</div>
			<div>networkStatus: {networkStatus}</div>
			<div>Loading: {loading + ''}</div>
			<div>Data: {JSON.stringify(data?.user?.me)}</div>
		</section>
	)
}

export default Profile
