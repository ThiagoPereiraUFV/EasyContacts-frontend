import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

interface AddContactDialog extends React.HTMLAttributes<HTMLDivElement> {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddContactDialog({ className = '', open, setOpen }: AddContactDialog) {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
			className={className}
		>
			<DialogTitle>{"Use Google's location service?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Let Google help apps determine location. This means sending anonymous
					location data to Google, even when no apps are running.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Disagree</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddContactDialog
