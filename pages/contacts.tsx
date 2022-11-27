import AddContactButton from 'components/organisms/AddContactButton'
import type { NextPage } from 'next'
import ContactsDisplay from '../components/organisms/ContactsDisplay'

const Contacts: NextPage = () => {
	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<ContactsDisplay />
			<AddContactButton className="tw-fixed tw-bottom-4 tw-right-4 tw-transition-colors tw-duration-500 hover:tw-text-purple-600 tw-rounded-full" />
		</main>
	)
}

Contacts.displayName = 'Contatos'

export default Contacts
