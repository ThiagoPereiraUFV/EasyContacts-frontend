import * as React from 'react'
import { TextField } from '@mui/material'

interface InputTextProps extends React.PropsWithChildren<unknown> {
	id: string
	label: string
	type?: React.HTMLInputTypeAttribute
	className?: string
	value: string | null
	setter:
		| React.Dispatch<React.SetStateAction<string | null>>
		| React.Dispatch<React.SetStateAction<string>>
}

function InputText({
	id,
	label,
	type = 'text',
	className,
	value,
	setter,
}: InputTextProps) {
	return (
		<TextField
			id={id}
			name={id}
			label={label}
			type={type}
			variant="outlined"
			color="primary"
			className={className}
			sx={{
				'& fieldset': {
					borderRadius: '30px',
				},
			}}
			value={value}
			onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
				setter(target.value)
			}
		/>
	)
}

export default InputText
