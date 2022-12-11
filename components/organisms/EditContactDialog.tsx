import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	TextareaAutosize,
	TextField,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import api from 'helpers/api'
import { useRouter } from 'next/router'
import React, {
	ChangeEvent,
	forwardRef,
	ReactElement,
	Ref,
	useState,
} from 'react'
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
	const router = useRouter()
	const [id, setId] = useState<string>(selectedContact.id)
	const [contact, setContact] = useState<IContact>(selectedContact)

	useEffect(() => {
		setContact(selectedContact)
		setId(selectedContact.id)
	}, [selectedContact])

	async function handleSubmit() {
		for (const key in contact) {
			if (contact[key as keyof IContact] === null) {
				delete contact[key as keyof IContact]
			}
		}

		;['createdAt', 'updatedAt', 'id', 'userId'].forEach(
			(key) => delete contact[key as keyof IContact]
		)

		const { data } = await api.patch(`/contacts/mine/${id}`, contact)

		if (!data) {
			throw new Error('Error updating contact')
		}

		router.reload()
	}

	async function handleDelete() {
		const { data } = await api.delete(`/contacts/mine/${id}`)

		if (!data) {
			throw new Error('Error deleting contact')
		}

		router.reload()
	}

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			aria-describedby="alert-dialog-slide-description"
			className={className}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle>
				{contact.name} {contact.surname}
			</DialogTitle>
			<DialogContent className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
				<TextField
					id="name"
					label="Nome"
					type="text"
					name="name"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={contact.name}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setContact({ ...contact, name: target.value })
					}
				/>
				<TextField
					id="surname"
					label="Sobrenome"
					type="text"
					name="surname"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={contact.surname}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setContact({ ...contact, surname: target.value })
					}
				/>
				<TextField
					id="phone"
					label="Telefone"
					type="tel"
					name="phone"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={contact.phone}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setContact({ ...contact, phone: target.value })
					}
				/>
				<TextField
					id="email"
					label="Email"
					type="email"
					name="email"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={contact.email}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setContact({ ...contact, email: target.value })
					}
				/>
				<TextField
					id="address"
					label="Endereço"
					type="text"
					name="address"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={contact.address}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setContact({ ...contact, address: target.value })
					}
				/>
				<TextareaAutosize
					id="annotations"
					placeholder="Anotações"
					name="annotations"
					color="primary"
					className="tw-bg-white tw-rounded-xl tw-border tw-border-gray-400 hover:tw-border-black tw-p-1"
					minRows={5}
					defaultValue={contact.annotations ?? ''}
					onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
						setContact({ ...contact, annotations: target.value })
					}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button color="error" onClick={handleDelete}>
					Apagar
				</Button>
				<Button type="submit" color="primary" onClick={handleSubmit}>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditContactDialog
