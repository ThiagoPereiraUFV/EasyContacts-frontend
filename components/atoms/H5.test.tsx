import { render, screen } from '@testing-library/react'
import H5 from 'components/atoms/H5'
import { mockRandomSentence } from 'helpers/mock'
import '@testing-library/jest-dom'

const texts = [
	mockRandomSentence(),
	mockRandomSentence(),
	mockRandomSentence(),
	mockRandomSentence(),
	mockRandomSentence(),
] as string[]

describe('H5', () => {
	for (const text of texts) {
		it(`Renders a heading of size 5 with text: ${text}`, () => {
			render(<H5>{text}</H5>)

			const heading = screen.getByText(text)

			expect(heading).toBeInTheDocument()
		})
	}
})
