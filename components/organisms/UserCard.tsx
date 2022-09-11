import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import ContentCard from '../molecules/ContentCard'

interface UserCardProps {
	className?: string
}

function UserCard({ className = '' }: UserCardProps) {
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

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		alert(
			`Cadastro: ${email} - Senha: ${password} - Nome: ${name} - Senha antiga: ${oldPassword}`
		)
	}

	async function handleCloseAccount(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		alert(`Encerrar conta`)
	}

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
					label="Senha"
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
					label="Confirme sua senha"
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
						disabled={!name || !email || !password || !oldPassword}
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
