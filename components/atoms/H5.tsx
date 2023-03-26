import * as React from 'react'
import Typography from '@mui/material/Typography'

interface H5Props extends React.PropsWithChildren<unknown> {
	className?: string
}

function H5({ children, className }: H5Props) {
	return (
		<Typography className={className} variant="h5" component="div">
			{children}
		</Typography>
	)
}

export default H5
