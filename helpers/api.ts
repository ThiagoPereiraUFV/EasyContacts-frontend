import axios from 'axios'
import { getSession } from 'next-auth/react'

function API() {
	const options = {
		baseURL: process.env.NEXT_PUBLIC_API_URL,
	}

	const instance = axios.create(options)

	instance.interceptors.request.use(async (request) => {
		const session = await getSession()

		if (session) {
			Object.assign(request.headers, { Authorization: `Bearer ${session.jwt}` })
		}

		return request
	})

	return instance
}

export default API()
