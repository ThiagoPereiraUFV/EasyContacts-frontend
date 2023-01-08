export interface IUser {
	id: string
	name: string
	email: string
	password: string
	avatar: string | null
	createdAt: Date
	updatedAt: Date
}
