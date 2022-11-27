export interface IContact {
	id: string
	name: string
	surname: string
	phone: string | null
	email: string | null
	address: string | null
	annotations: string | null
	avatar: string | null
	userId: string
	createdAt: Date
	updatedAt: Date
}
