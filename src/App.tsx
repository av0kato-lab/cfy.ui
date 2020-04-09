import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import 'sass/style.sass'

import Auth from 'pages/Auth'
import Profile from 'pages/Profile'
import Events from 'pages/Events'

import Navbar from 'components/Navbar'
import PrivateRoute from 'containers/PrivateRoute'

import { useAuthState } from 'hooks/auth'

// import { changeCity } from 'helpers/Modals'
// import Logger from 'components/helpers/Logger'

function App() {
	const isAuth = useAuthState()

	return (
		<div className="App">
			<Navbar list={['index', 'events', 'profile']} />
			<main>
				<Switch>
					<Route exact path="/">
						<h1>Hello, world!</h1>
					</Route>

					<Route path="/auth">{isAuth ? <Redirect to="/" /> : <Auth />}</Route>
					<Route path="/events" component={Events} />

					<PrivateRoute path="/profile">
						<Profile />
					</PrivateRoute>

					<Route path="*">404</Route>
				</Switch>
			</main>
			<footer />
			{/* {modal === changeCity.name && <changeCity.component />} */}
			{/* <Logger /> */}
		</div>
	)
}

export default App
