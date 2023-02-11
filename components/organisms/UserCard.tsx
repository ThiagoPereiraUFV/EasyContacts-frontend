import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { FormEvent, MouseEvent, useEffect, useState } from 'react'
import ContentCard from '../molecules/ContentCard'
import { useSession } from 'next-auth/react'
import api from 'helpers/api'
import nprogress from 'nprogress'
import axios from 'axios'
import { useRouter } from 'next/router'
import useAlert from 'hooks/useAlert'
import InputText from 'components/atoms/InputText'

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserCard({ className = '' }: UserCardProps) {
	const { setAlert } = useAlert()
	const { data: session } = useSession()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const textFieldClass = 'tw-bg-white tw-rounded-full'
	const router = useRouter()

	const userCardProps = {
		title: {
			text: 'Ajuste sua conta:',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
	}

	// UserCard hook
	useEffect(() => {
		setName(session?.user?.name ?? '')
		setEmail(session?.user?.email ?? '')
	}, [session])

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const updatedUser = {
			name: name !== session?.user?.name ? name : undefined,
			email: email !== session?.user?.email ? email : undefined,
			password: password || undefined,
			oldPassword: oldPassword || undefined,
		}

		try {
			nprogress.start()
			const { data } = await api.patch('/auth/updateme', updatedUser)

			if (!data) {
				throw new Error('Error updating user')
			}
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

	async function handleCloseAccount(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()

		try {
			nprogress.start()
			const { data } = await api.delete('/auth/removeme')

			if (!data) {
				throw new Error('Error deleting user')
			}

			router.push('/user/logout')
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

	const disableUpdate =
		(email === session?.user?.email &&
			password === '' &&
			name === session?.user?.name) ||
		(password !== '' && oldPassword === '')

	return (
		<ContentCard title={userCardProps.title} className={className}>
			<Box
				className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6"
				component="form"
				onSubmit={handleSubmit}
			>
				<InputText
					id="name"
					label="Nome"
					className={textFieldClass}
					value={name}
					setter={setName}
				/>
				<InputText
					id="email"
					label="Email"
					type="email"
					className={textFieldClass}
					value={email}
					setter={setEmail}
				/>
				<InputText
					id="password"
					label="Nova senha"
					type="password"
					className={textFieldClass}
					value={password}
					setter={setPassword}
				/>
				<InputText
					id="oldPassword"
					label="Confirme sua senha atual"
					type="password"
					className={textFieldClass}
					value={oldPassword}
					setter={setOldPassword}
				/>
				<div className="tw-grid tw-grid-cols-1 tw-gap-y-6 lg:tw-col-span-2">
					<Button
						className="tw-mx-auto tw-px-8"
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						disabled={disableUpdate}
					>
						Atualizar
					</Button>
					<Button
						className="tw-mx-auto tw-px-8"
						type="button"
						variant="contained"
						color="error"
						size="large"
						onClick={handleCloseAccount}
					>
						Encerrar conta
					</Button>
				</div>
			</Box>
		</ContentCard>
	)
}

export default UserCard
