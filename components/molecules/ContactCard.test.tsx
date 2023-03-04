import { render, screen } from '@testing-library/react'
import ContactCard from 'components/molecules/ContactCard'
import { mockContact } from 'helpers/mock'
import '@testing-library/jest-dom'

const contacts = [
	mockContact(),
	mockContact(),
	mockContact(),
	mockContact(),
	mockContact(),
]

describe('ContactCard', () => {
	for (const contact of contacts) {
		it(`Renders a contact card with contact name ${contact.name} and surname ${contact.surname}`, () => {
			render(<ContactCard contact={contact} />)

			const name = screen.getByText(contact.name, { exact: false })
			const surname = screen.getByText(contact.surname, { exact: false })

			expect(name).toBeInTheDocument()
			expect(surname).toBeInTheDocument()
		})
	}
})
