import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../layouts/default'
import theme from '../mui.themes'
import { ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'helpers/createEmotionCache'

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
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</SessionProvider>
		</CacheProvider>
	)
}

export default MyApp
