import AddContactButton from 'components/organisms/AddContactButton'
import AddContactDialog from 'components/organisms/AddContactDialog'
import type { NextPage } from 'next'
import { useState } from 'react'
import ContactsDisplay from '../components/organisms/ContactsDisplay'

const Contacts: NextPage = () => {
	const [open, setOpen] = useState(false)

	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<ContactsDisplay />
			<AddContactDialog open={open} setOpen={setOpen} />
			<AddContactButton
				onClick={() => setOpen(true)}
				className="tw-fixed tw-bottom-4 tw-right-4 tw-transition-colors tw-duration-500 hover:tw-text-purple-600 tw-rounded-full"
			/>
		</main>
	)
}

Contacts.displayName = 'Contatos'

export default Contacts
