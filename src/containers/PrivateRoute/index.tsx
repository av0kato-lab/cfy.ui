import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthState } from 'hooks/auth'

const PrivateRoute: React.FC<{
	children: React.ReactNode
	path: string
}> = ({ children, ...rest }) => {
	const isAuth = useAuthState()

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/auth',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
