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
import axios from 'axios'
import api from 'helpers/api'
import useAlert from 'hooks/useAlert'
import { useRouter } from 'next/router'
import nprogress from 'nprogress'
import React, { ChangeEvent, useState } from 'react'
import { useEffect } from 'react'
import { IContact } from 'types/contact'

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
	const router = useRouter()
	const { setAlert } = useAlert()
	const [contact, setContact] = useState<IContact>({} as IContact)

	useEffect(() => {
		setContact({} as IContact)
	}, [open])

	async function handleSubmit() {
		try {
			nprogress.start()
			const { data } = await api.post('/contacts/mine', contact)

			if (!data) {
				throw new Error('Error creating contact')
			}

			router.reload()
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setAlert(err.response?.data.message, 'error')
			} else if (err instanceof Error) {
				setAlert(err.message, 'error')
			} else {
				setAlert(JSON.stringify(err), 'error')
			}
		} finally {
			nprogress.done()
		}
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
			<DialogTitle>Adicionar novo contato</DialogTitle>
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
				<Button type="submit" color="primary" onClick={handleSubmit}>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddContactDialog
