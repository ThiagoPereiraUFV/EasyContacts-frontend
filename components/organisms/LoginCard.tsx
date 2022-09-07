import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import ContentCard from '../molecules/ContentCard'

function LoginCard() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loginCardProps = {
		title: {
			text: 'Acesse sua conta:',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
	}

	async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		alert(`Login: ${email} - Senha: ${password}`)
	}

	return (
		<ContentCard
			title={loginCardProps.title}
			className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 tw-py-6 md:tw-w-1/2 lg:tw-w-1/3 tw-mx-4 md:tw-mx-auto lg:tw-mx-auto"
		>
			<Box
				className="tw-grid tw-grid-cols-1 tw-gap-y-6"
				component="form"
				onSubmit={handleSubmit}
			>
				<TextField
					id="email"
					label="Email"
					type="email"
					variant="outlined"
					color="primary"
					className="tw-bg-white tw-rounded-full"
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
					className="tw-bg-white tw-rounded-full"
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
				<small className="tw-text-white tw-text-center">
					Não tem conta? Clique{' '}
					<Link href="/user/signup">
						<span className="hover:tw-text-purpleTransparent tw-cursor-pointer">
							aqui
						</span>
					</Link>{' '}
					para se cadastrar
				</small>
				<Button
					className="tw-mx-auto tw-px-8"
					type="submit"
					variant="contained"
					color="primary"
					size="large"
					disabled={!email || !password}
				>
					Acessar
				</Button>
			</Box>
		</ContentCard>
	)
}

export default LoginCard
