import { createContext, useState } from 'react'

interface ISetAlert {
	(text: string, type: AlertType): void
}

const ALERT_TIME = 5000
const initialState = {
	text: '',
	type: '',
}

const AlertContext = createContext({
	...initialState,
	setAlert: (() => {}) as ISetAlert,
})

enum AlertType {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
}

export const AlertProvider = ({
	children,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: React.ReactElement<any, any>
}) => {
	const [text, setText] = useState('')
	const [type, setType] = useState('')

	const setAlert: ISetAlert = (text: string, type: AlertType) => {
		setText(text)
		setType(type)

		setTimeout(() => {
			setText('')
			setType('')
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
