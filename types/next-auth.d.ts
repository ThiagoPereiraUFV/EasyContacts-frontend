import 'next-auth'
import 'next-auth/jwt'

import { IUser } from 'next-auth'

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
