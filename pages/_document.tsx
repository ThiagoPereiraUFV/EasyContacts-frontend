import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/organisms/Footer'
import Navbar from '../components/organisms/Navbar'

function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
			</Head>
			<body>
				<Navbar />
				<Main />
				<NextScript />
				<Footer />
			</body>
		</Html>
	)
}

export default Document
