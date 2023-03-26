import { render, screen } from '@testing-library/react'
import Footer from 'components/organisms/Footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
	it(`Renders a footer with text: Thiago Pereira`, () => {
		render(<Footer />)

		const texts = screen.getAllByText('Thiago Pereira')

		for (const text of texts) {
			expect(text).toBeInTheDocument()
		}
	})
})
