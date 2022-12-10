import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import ContentCard from '../molecules/ContentCard'
import { useSession } from 'next-auth/react'
import api from 'helpers/api'

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserCard({ className = '' }: UserCardProps) {
	const { data: session } = useSession()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const textFieldClass = 'tw-bg-white tw-rounded-full'

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

		const { data } = await api.patch('/auth/updateme', updatedUser)

		if (!data) {
			throw new Error('Error updating user')
		}
	}

	async function handleCloseAccount(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		alert(`Encerrar conta`)
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
				<TextField
					id="name"
					label="Nome"
					type="text"
					variant="outlined"
					color="primary"
					className={textFieldClass}
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={name}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setName(target.value)
					}
				/>
				<TextField
					id="email"
					label="Email"
					type="email"
					variant="outlined"
					color="primary"
					className={textFieldClass}
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={email}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setEmail(target.value)
					}
				/>
				<TextField
					id="password"
					label="Nova senha"
					type="password"
					variant="outlined"
					color="primary"
					className={textFieldClass}
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={password}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setPassword(target.value)
					}
				/>
				<TextField
					id="oldPassword"
					label="Confirme sua senha atual"
					type="password"
					variant="outlined"
					color="primary"
					className={textFieldClass}
					sx={{
						'& fieldset': {
							borderRadius: '30px',
						},
					}}
					value={oldPassword}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setOldPassword(target.value)
					}
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
