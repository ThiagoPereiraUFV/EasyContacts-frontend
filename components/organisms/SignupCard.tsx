import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { FormEvent, ChangeEvent, useState } from 'react'
import ContentCard from '../molecules/ContentCard'

function SignupCard() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const textFieldClass = 'tw-bg-white tw-rounded-full'

	const signupCardProps = {
		title: {
			text: 'Abra sua conta:',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		alert(
			`Cadastro: ${email} - Senha: ${password} - Nome: ${name} - Confirmação de senha: ${passwordConfirmation}`
		)
	}

	return (
		<ContentCard
			title={signupCardProps.title}
			className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 tw-py-6 md:tw-w-1/2 lg:tw-w-2/3 tw-mx-4 md:tw-mx-auto lg:tw-mx-auto"
		>
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
					id="passwordConfirmation"
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
					value={passwordConfirmation}
					onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
						setPasswordConfirmation(target.value)
					}
				/>
				<div className="tw-grid tw-grid-cols-1 tw-gap-y-6 lg:tw-col-span-2">
					<small className="tw-text-white tw-text-center">
						Já tem uma conta? Clique{' '}
						<Link href="/user/login">
							<span className="hover:tw-text-purpleTransparent tw-cursor-pointer">
								aqui
							</span>
						</Link>{' '}
						para acessar
					</small>
					<Button
						className="tw-mx-auto tw-px-8"
						type="submit"
						variant="contained"
						color="primary"
						size="large"
						disabled={!name || !email || !password || !passwordConfirmation}
					>
						Cadastrar
					</Button>
				</div>
			</Box>
		</ContentCard>
	)
}

export default SignupCard
