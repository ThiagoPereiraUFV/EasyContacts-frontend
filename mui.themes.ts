import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const config = resolveConfig(tailwindConfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const theme: any = config.theme

let muiTheme = createTheme({
	palette: {
		primary: {
			main: theme?.colors?.purple?.['600'] as string,
		},
		secondary: {
			main: theme?.colors?.blue?.['600'] as string,
		},
	},
})
muiTheme = responsiveFontSizes(muiTheme)

export default muiTheme
