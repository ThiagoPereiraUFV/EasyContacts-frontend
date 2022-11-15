import 'next-auth'
import 'next-auth/jwt'

interface IUser {
	id: string
	name: string
	email: string
	password: string
	avatar: string | null
	createdAt: Date
	updatedAt: Date
}

declare module 'next-auth' {
	interface Session {
		jwt: string
		user?: IUser
	}

	interface User {
		jwt: string
		user: IUser
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: IUser
		jwt: string
	}
}
