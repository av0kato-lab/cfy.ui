import React from 'react'
import { Link } from 'react-router-dom'
import './style.sass'
import User from 'components/User'
import { useLogout, useAuthState } from 'hooks/auth'

// import { changeCity } from 'helpers/Modals'

const routes = (list: string[]) =>
	list
		.filter(el => el)
		.map((route, i) => {
			return (
				<li key={i}>
					{route === 'index' ? (
						<Link to="/">Index</Link>
					) : (
						<Link to={'/' + route}>
							{route[0].toUpperCase() + route.slice(1)}
						</Link>
					)}
				</li>
			)
		})

const Navbar: React.FC<{
	list: string[]
}> = ({ list }) => {
	const isAuth = useAuthState()
	const logout = useLogout()

	return (
		<header className="navbar">
			<div className="navbar__menu">
				<ul className="navbar__list">{routes(list)}</ul>
				{isAuth ? (
					<>
						<User />
						<button onClick={() => logout()}>Logout</button>
					</>
				) : (
					<Link to="/auth">Login</Link>
				)}
				<button
					type="button"
					className="navbar__city"
					// onClick={() => props.changeModal(changeCity.name)}
				>
					{/* {props.city.title} */}
				</button>
			</div>
		</header>
	)
}

export default Navbar
