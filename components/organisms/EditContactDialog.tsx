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
import React, { forwardRef, ReactElement, Ref, useState } from 'react'
import { useEffect } from 'react'
import { IContact } from 'types/contact'

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		children: ReactElement<any, any>
	},
	ref: Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

interface EditContactDialog extends React.HTMLAttributes<HTMLDivElement> {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	selectedContact: IContact
}

function EditContactDialog({
	className = '',
	selectedContact,
	open,
	setOpen,
}: EditContactDialog) {
	const [contact, setContact] = useState<IContact>(selectedContact)

	useEffect(() => {
		setContact(selectedContact)
	}, [selectedContact])

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
			className={className}
		>
			<DialogTitle>
				{contact.name} {contact.surname}
			</DialogTitle>
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

export default EditContactDialog
