import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	TextareaAutosize,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import axios from 'axios'
import InputText from 'components/atoms/InputText'
import api from 'helpers/api'
import useAlert from 'hooks/useAlert'
import { useRouter } from 'next/router'
import nprogress from 'nprogress'
import React, { ChangeEvent, useState } from 'react'
import { useEffect } from 'react'

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
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [annotations, setAnnotations] = useState('')

	useEffect(() => {
		setName('')
		setSurname('')
		setPhone('')
		setEmail('')
		setAddress('')
		setAnnotations('')
	}, [open])

	async function handleSubmit() {
		try {
			nprogress.start()
			const contact = {
				name,
				surname,
				phone,
				email,
				address,
				annotations,
			}
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
				<InputText
					id="name"
					label="Nome"
					className="tw-bg-white tw-rounded-full"
					value={name}
					setter={setName}
				/>
				<InputText
					id="surname"
					label="Sobrenome"
					className="tw-bg-white tw-rounded-full"
					value={surname}
					setter={setSurname}
				/>
				<InputText
					id="phone"
					label="Telefone"
					type="tel"
					className="tw-bg-white tw-rounded-full"
					value={phone}
					setter={setPhone}
				/>
				<InputText
					id="email"
					label="Email"
					type="email"
					className="tw-bg-white tw-rounded-full"
					value={email}
					setter={setEmail}
				/>
				<InputText
					id="address"
					label="Endereço"
					className="tw-bg-white tw-rounded-full"
					value={address}
					setter={setAddress}
				/>
				<TextareaAutosize
					id="annotations"
					placeholder="Anotações"
					name="annotations"
					color="primary"
					className="tw-bg-white tw-rounded-xl tw-border tw-border-gray-400 hover:tw-border-black tw-p-1"
					minRows={5}
					defaultValue={annotations ?? ''}
					onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
						setAnnotations(target.value)
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
