import api from 'helpers/api'
import nprogress from 'nprogress'
import { useEffect, useState } from 'react'
import { IContact } from 'types/contact'

function useContacts() {
	const [contacts, setContacts] = useState<IContact[]>([])

	useEffect(() => {
		async function fetchContacts() {
			nprogress.start()
			const { data } = await api.get('/contacts/mine')
			nprogress.done()

			setContacts(data)
		}

		fetchContacts()
	}, [])

	return { contacts }
}

export { useContacts }
