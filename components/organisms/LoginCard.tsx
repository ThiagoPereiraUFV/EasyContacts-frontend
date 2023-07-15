import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ContentCard from '../molecules/ContentCard'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import InputText from 'components/atoms/InputText'

interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {}

function LoginCard({ className = '' }: LoginCardProps) {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loginCardProps = {
		title: {
			text: 'Acesse sua conta:',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const signinOptions = {
			email,
			password,
			callbackUrl: router.query.callbackUrl?.toString() ?? '/',
		}

		await signIn('credentials', signinOptions)
	}

	return (
		<ContentCard title={loginCardProps.title} className={className}>
			<Box
				className="tw-grid tw-grid-cols-1 tw-gap-y-6"
				component="form"
				onSubmit={handleSubmit}
			>
				<InputText
					id="email"
					label="Email"
					type="email"
					className="tw-bg-white tw-rounded-full"
					value={email}
					setter={setEmail}
				/>
				<InputText
					id="password"
					label="Senha"
					type="password"
					className="tw-bg-white tw-rounded-full"
					value={password}
					setter={setPassword}
				/>
				<small className="tw-text-white tw-text-center">
					Não tem conta? Clique{' '}
					<Link id="signup-url" href="/user/signup">
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
