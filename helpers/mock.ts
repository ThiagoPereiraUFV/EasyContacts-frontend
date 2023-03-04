import * as faker from 'faker-br'

function mockInputFieldAttrs() {
	return {
		id: faker.random.uuid(),
		label: faker.name.firstName(),
		type: 'text',
		value: faker.lorem.sentence(),
		setter: jest.fn(),
	}
}

export { mockInputFieldAttrs }
