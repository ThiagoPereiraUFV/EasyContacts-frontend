import { AlertColor } from '@mui/material'
import { createContext, useState } from 'react'

interface ISetAlert {
	(text: string, type: AlertColor): void
}

const ALERT_TIME = 5000
const initialState = {
	text: '',
	type: 'success' as AlertColor,
}

const AlertContext = createContext({
	...initialState,
	setAlert: (() => {}) as ISetAlert,
})

export const AlertProvider = ({
	children,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: React.ReactElement<any, any>
}) => {
	const [text, setText] = useState('')
	const [type, setType] = useState<AlertColor>('success')

	const setAlert: ISetAlert = (text: string, type: AlertColor) => {
		setText(text)
		setType(type)

		setTimeout(() => {
			setText('')
			setType('success')
		}, ALERT_TIME)
	}

	return (
		<AlertContext.Provider
			value={{
				text,
				type,
				setAlert,
			}}
		>
			{children}
		</AlertContext.Provider>
	)
}

export default AlertContext
