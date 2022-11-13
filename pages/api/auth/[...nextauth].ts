import { AxiosError } from 'axios'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import api from 'helpers/api'

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const { data } = await api.post('/auth/login', {
						email: credentials?.email,
						password: credentials?.password,
					})

					return data
				} catch (err) {
					if (err instanceof AxiosError) {
						console.error(err.response?.data)
					}

					return null
				}
			},
		}),
		// ...add more providers here
	],
	pages: {
		signIn: '/user/login',
		signOut: '/user/logout',
		newUser: '/user/signup',
	},
}

export default NextAuth(authOptions)
