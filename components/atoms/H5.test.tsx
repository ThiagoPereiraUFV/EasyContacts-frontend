import { render, screen } from '@testing-library/react'
import H5 from 'components/atoms/H5'
import * as faker from 'faker-br'
import '@testing-library/jest-dom'

const texts = [
	faker.lorem.sentence(),
	faker.lorem.sentence(),
	faker.lorem.sentence(),
	faker.lorem.sentence(),
	faker.lorem.sentence(),
]

describe('H5', () => {
	for (const text of texts) {
		it(`Renders a heading of size 5 with text: ${text}`, () => {
			render(<H5>{text}</H5>)

			const heading = screen.getByText(text)

			expect(heading).toBeInTheDocument()
		})
	}
})
