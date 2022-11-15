import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../layouts/default'
import { ThemeProvider } from '@mui/material'
import theme from '../mui.themes'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<>
			<Head>
				<title>{`EasyContacts ${
					Component.displayName ? ` - ${Component.displayName}` : ''
				}`}</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<SessionProvider session={session}>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</SessionProvider>
		</>
	)
}

export default MyApp
