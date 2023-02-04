import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../layouts/default'
import theme from '../mui.themes'
import { ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'helpers/createEmotionCache'
import NextNProgress from 'nextjs-progressbar'
import { AlertProvider } from 'contexts/AlertContext'

export interface IAppProps extends AppProps {
	emotionCache?: ReturnType<typeof createEmotionCache>
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps: { session, ...pageProps },
}: IAppProps) {
	return (
		<AlertProvider>
			<CacheProvider value={emotionCache}>
				<Head>
					<title>{`EasyContacts ${
						Component.displayName ? ` - ${Component.displayName}` : ''
					}`}</title>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<SessionProvider session={session}>
					<ThemeProvider theme={theme}>
						<Layout>
							<NextNProgress height={3} />
							<Component {...pageProps} />
						</Layout>
					</ThemeProvider>
				</SessionProvider>
			</CacheProvider>
		</AlertProvider>
	)
}

export default MyApp
