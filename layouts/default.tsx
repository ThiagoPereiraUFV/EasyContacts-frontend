import * as React from 'react'
import Footer from '../components/organisms/Footer'
import Navbar from '../components/organisms/Navbar'

function Layout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default Layout
