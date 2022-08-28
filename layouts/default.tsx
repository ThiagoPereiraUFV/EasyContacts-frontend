import * as React from 'react'
import Footer from '../components/organisms/Footer'
import Navbar from '../components/organisms/Navbar'

function Layout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<div className="tw-grid tw-grid-cols-1 tw-content-between tw-h-screen">
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
