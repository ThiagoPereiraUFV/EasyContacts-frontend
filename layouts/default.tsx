import AddContactButton from 'components/organisms/AddContactButton'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import Footer from '../components/organisms/Footer'
import Navbar from '../components/organisms/Navbar'

function Layout({ children }: React.PropsWithChildren<unknown>) {
	const { data: session } = useSession()

	return (
		<div className="tw-grid tw-content-between tw-h-screen">
			{session?.jwt && <Navbar />}
			{children}
			<AddContactButton className="tw-fixed tw-bottom-4 tw-right-4 tw-transition-colors tw-duration-500 hover:tw-text-purple-600 tw-rounded-full" />
			<Footer className="tw-flex tw-flex-row tw-gap-x-1 tw-justify-center tw-text-white tw-py-2" />
		</div>
	)
}

export default Layout
