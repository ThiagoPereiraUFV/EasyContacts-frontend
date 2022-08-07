import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{`EasyContacts ${
					Component.displayName ? ` - ${Component.displayName}` : ''
				}`}</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
