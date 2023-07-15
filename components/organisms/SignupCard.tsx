import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ContentCard from '../molecules/ContentCard'
import api from 'helpers/api'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import nprogress from 'nprogress'
import axios from 'axios'
import useAlert from 'hooks/useAlert'
import InputText from 'components/atoms/InputText'

interface SignupCardProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignupCard({ className = '' }: SignupCardProps) {
	const { setAlert } = useAlert()
	const router = useRouter()
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

		const payload = {
			name,
			email,
			password,
		}

		try {
			nprogress.start()
			const { data } = await api.post('/auth/register', payload)

			if (!data) {
				throw new Error('Error registering user')
			}

			const signinOptions = {
				email: data.email,
				password,
				callbackUrl: router.query.callbackUrl?.toString() ?? '/',
			}

			await signIn('credentials', signinOptions)
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
		<ContentCard title={signupCardProps.title} className={className}>
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
					label="Senha"
					type="password"
					className={textFieldClass}
					value={password}
					setter={setPassword}
				/>
				<InputText
					id="passwordConfirmation"
					label="Confirme sua senha"
					type="password"
					className={textFieldClass}
					value={passwordConfirmation}
					setter={setPasswordConfirmation}
				/>
				<div className="tw-grid tw-grid-cols-1 tw-gap-y-6 lg:tw-col-span-2">
					<small className="tw-text-white tw-text-center">
						Já tem uma conta? Clique{' '}
						<Link id="login-url" href="/user/login">
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
