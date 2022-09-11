import type { NextPage } from 'next'
import SignupCard from '../../components/organisms/SignupCard'

const Signup: NextPage = () => {
	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<SignupCard className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 tw-py-6 md:tw-w-1/2 lg:tw-w-2/3 tw-m-auto" />
		</main>
	)
}

Signup.displayName = 'Cadastro'

export default Signup
