import { useContacts } from 'hooks/useContacts'
import ContactCard from '../molecules/ContactCard'

function ContactsDisplay() {
	const { contacts } = useContacts()

	return (
		<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-4 tw-container tw-mx-auto">
			{contacts.map((contact, index) => (
				<ContactCard
					className="tw-bg-purpleTransparent tw-p-2 tw-rounded-xl tw-mx-auto tw-h-max"
					contact={contact}
					key={index}
				/>
			))}
		</div>
	)
}

export default ContactsDisplay
