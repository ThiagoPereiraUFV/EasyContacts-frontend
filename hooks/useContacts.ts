import api from 'helpers/api'
import { useEffect, useState } from 'react'
import { IContact } from 'types/contact'

function useContacts() {
	const [contacts, setContacts] = useState<IContact[]>([])

	useEffect(() => {
		async function fetchContacts() {
			const { data } = await api.get('/contacts/mine')

			setContacts(data)
		}

		fetchContacts()
	}, [])

	return { contacts }
}

export { useContacts }
