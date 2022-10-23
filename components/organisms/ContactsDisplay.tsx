import ContactCard from '../molecules/ContactCard'

function ContactsDisplay() {
	return (
		<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-4 tw-container tw-mx-auto">
			{[...Array(18)].map((e, index) => (
				<ContactCard
					className="tw-bg-purpleTransparent tw-p-2 tw-rounded-xl tw-mx-auto tw-h-max"
					key={index}
				/>
			))}
		</div>
	)
}

export default ContactsDisplay
