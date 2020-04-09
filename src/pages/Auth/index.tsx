import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from 'api/gql/auth'
import { GET_TOKEN } from 'api/gql/client'

const Auth = () => {
	const [user, setUser] = useState<{
		email: string
		password: string
	}>({
		email: '0.snilcy@gmail.com',
		password: 'test',
	})

	const location = useLocation()
	const history = useHistory()

	const onInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[target.name]: target.value,
		})
	}

	const [login] = useMutation(LOGIN, {
		update(cache, { data }) {
			const { token } = data.auth.login

			cache.writeQuery({
				query: GET_TOKEN,
				data: { token },
			})

			let { from } = (location.state as any) || { from: { pathname: '/' } }
			history.replace(from)
		},
	})

	return (
		<section>
			<h2>Авторизация</h2>
			<form>
				<div>
					<label>
						Почта
						<input
							type="email"
							name="email"
							autoComplete="username"
							onChange={onInput}
							value={user.email}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Пароль
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							onChange={onInput}
							value={user.password}
							required
						/>
					</label>
				</div>
				<button
					type="button"
					onClick={() => {
						login({
							variables: user,
						})
					}}
				>
					Войти
				</button>
				<button type="button" onClick={console.log}>
					Зарегистрироваться
				</button>
				<button type="button" onClick={console.log}>
					Профиль
				</button>
			</form>
		</section>
	)
}

export default Auth
