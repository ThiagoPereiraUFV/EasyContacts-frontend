import * as faker from 'faker-br'
import { IContact } from 'types/contact'

function mockInputFieldAttrs() {
	return {
		id: faker.random.uuid(),
		label: faker.name.firstName(),
		type: 'text',
		value: faker.lorem.sentence(),
		setter: jest.fn(),
	}
}

function mockContact(): IContact {
	return {
		id: faker.random.uuid(),
		name: faker.name.firstName(),
		surname: faker.name.lastName(),
		address: faker.address.streetAddress(),
		annotations: faker.lorem.sentence(),
		avatar: faker.image.avatar(),
		userId: faker.random.uuid(),
		phone: faker.phone.phoneNumber(),
		email: faker.internet.email(),
	}
}

export { mockInputFieldAttrs, mockContact }
