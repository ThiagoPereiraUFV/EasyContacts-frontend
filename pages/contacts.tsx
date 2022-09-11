import type { NextPage } from 'next'
import ContactsDisplay from '../components/organisms/ContactsDisplay'

const Contacts: NextPage = () => {
	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<ContactsDisplay />
		</main>
	)
}

Contacts.displayName = 'Contatos'

export default Contacts
