import * as React from 'react'
import Footer from '../components/organisms/Footer'

function Layout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<div className="tw-grid tw-content-between lg:tw-h-screen">
			{children}
			<Footer className="tw-flex tw-flex-row tw-gap-x-1 tw-justify-center tw-text-white tw-py-2" />
		</div>
	)
}

export default Layout
