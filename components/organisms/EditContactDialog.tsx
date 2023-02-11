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
	const { setAlert } = useAlert()
	const router = useRouter()
	const [id, setId] = useState(selectedContact.id)
	const [name, setName] = useState(selectedContact.name)
	const [surname, setSurname] = useState(selectedContact.surname)
	const [phone, setPhone] = useState(selectedContact.phone)
	const [email, setEmail] = useState(selectedContact.email)
	const [address, setAddress] = useState(selectedContact.address)
	const [annotations, setAnnotations] = useState(selectedContact.annotations)

	useEffect(() => {
		setName(selectedContact.name ?? '')
		setSurname(selectedContact.surname ?? '')
		setPhone(selectedContact.phone ?? '')
		setEmail(selectedContact.email ?? '')
		setAddress(selectedContact.address ?? '')
		setAnnotations(selectedContact.annotations ?? '')
		setId(selectedContact.id)
	}, [open, selectedContact])

	async function handleSubmit() {
		try {
			nprogress.start()
			const contact = {
				name: !!name ? name : undefined,
				surname: !!surname ? surname : undefined,
				phone: !!phone ? phone : undefined,
				email: !!email ? email : undefined,
				address: !!address ? address : undefined,
				annotations: !!annotations ? annotations : undefined,
			}
			const { data } = await api.patch(`/contacts/mine/${id}`, contact)

			if (!data) {
				throw new Error('Error updating contact')
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

	async function handleDelete() {
		try {
			nprogress.start()
			const { data } = await api.delete(`/contacts/mine/${id}`)

			if (!data) {
				throw new Error('Error deleting contact')
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
			<DialogTitle>
				{name} {surname}
			</DialogTitle>
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
