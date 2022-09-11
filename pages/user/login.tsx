import type { NextPage } from 'next'
import LoginCard from '../../components/organisms/LoginCard'

const Login: NextPage = () => {
	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<LoginCard className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 tw-py-6 md:tw-w-1/2 lg:tw-w-1/3 tw-m-auto" />
		</main>
	)
}

Login.displayName = 'Acesso'

export default Login
