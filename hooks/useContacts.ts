import axios from 'axios'
import api from 'helpers/api'
import nprogress from 'nprogress'
import { useEffect, useState } from 'react'
import { IContact } from 'types/contact'

function useContacts() {
	const [contacts, setContacts] = useState<IContact[]>([])

	useEffect(() => {
		async function fetchContacts() {
			try {
				nprogress.start()
				const { data } = await api.get('/contacts/mine')

				if (!data) {
					throw new Error('Error getting contacts')
				}

				setContacts(data)
			} catch (err) {
				if (axios.isAxiosError(err)) {
					// console.error(err.response?.data)
				} else if (err instanceof Error) {
					// console.error(err.message)
				} else {
					// console.error(err)
				}
			} finally {
				nprogress.done()
			}
		}

		fetchContacts()
	}, [])

	return { contacts }
}

export { useContacts }
