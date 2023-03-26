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

function mockRandomSentence(title?: boolean) {
	if (title) {
		return { text: faker.lorem.sentence() as string }
	} else {
		return faker.lorem.sentence() as string
	}
}

function mockJumbotronProps() {
	return {
		title: {
			text: faker.lorem.sentence() as string,
		},
		subtitle: {
			text: faker.lorem.sentence() as string,
		},
		body: {
			text: faker.lorem.sentence() as string,
		},
		button: {
			label: faker.lorem.sentence() as string,
			onClick: jest.fn(),
		},
	}
}

export {
	mockInputFieldAttrs,
	mockContact,
	mockRandomSentence,
	mockJumbotronProps,
}
