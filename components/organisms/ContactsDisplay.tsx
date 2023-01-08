import { useContacts } from 'hooks/useContacts'
import { useState } from 'react'
import { IContact } from 'types/contact'
import ContactCard from '../molecules/ContactCard'
import EditContactDialog from './EditContactDialog'

function ContactsDisplay() {
	const { contacts } = useContacts()
	const [open, setOpen] = useState(false)
	const [selectedContact, setSelectedContact] = useState<IContact>(
		{} as IContact
	)

	const contactCardStyle =
		'tw-transition tw-ease-in-out tw-delay-75  hover:tw-scale-105 tw-duration-300 tw-bg-purpleTransparent tw-p-2 tw-rounded-xl tw-mx-auto tw-h-max tw-cursor-pointer'

	return (
		<>
			<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-4 tw-container tw-mx-auto">
				{contacts.map((contact, index) => (
					<ContactCard
						className={contactCardStyle}
						contact={contact}
						key={index}
						onClick={() => {
							setSelectedContact(contact)
							setOpen(true)
						}}
					/>
				))}
			</div>
			<EditContactDialog
				open={open}
				setOpen={setOpen}
				selectedContact={selectedContact}
			/>
		</>
	)
}

export default ContactsDisplay
