import { render, screen } from '@testing-library/react'
import Navbar from 'components/organisms/Navbar'
import '@testing-library/jest-dom'
import { pages, settings } from 'components/organisms/Navbar'

describe('Navbar', () => {
	it(`Renders a navbar with text: EasyContacts`, () => {
		render(<Navbar />)

		const texts = screen.getAllByText('EasyContacts')

		for (const text of texts) {
			expect(text).toBeInTheDocument()
		}
	})

	for (const page of pages) {
		it(`Renders a navbar with text: ${page.title}`, () => {
			render(<Navbar />)

			const texts = screen.getAllByText(page.title)

			for (const text of texts) {
				expect(text).toBeInTheDocument()
			}
		})
	}

	for (const setting of settings) {
		it(`Renders a navbar with text: ${setting.title}`, () => {
			render(<Navbar />)

			const texts = screen.getAllByText(setting.title)

			for (const text of texts) {
				expect(text).toBeInTheDocument()
			}
		})
	}
})
