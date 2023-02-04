import axios from 'axios'
import api from 'helpers/api'
import nprogress from 'nprogress'
import { useEffect, useState } from 'react'
import { IContact } from 'types/contact'
import useAlert from './useAlert'

function useContacts() {
	const { setAlert } = useAlert()
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
					setAlert(err.response?.data.message, 'error')
				} else if (err instanceof Error) {
					setAlert(err.message, 'error')
				} else {
					setAlert(JSON.stringify(err), 'error')
				}
			} finally {
				nprogress.done()
			}
		}

		fetchContacts()
	}, [setAlert])

	return { contacts }
}

export { useContacts }
