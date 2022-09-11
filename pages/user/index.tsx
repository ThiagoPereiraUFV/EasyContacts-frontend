import type { NextPage } from 'next'
import UserCard from '../../components/organisms/UserCard'

const User: NextPage = () => {
	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<UserCard className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 tw-py-6 md:tw-w-1/2 lg:tw-w-2/3 tw-m-auto" />
		</main>
	)
}

User.displayName = 'Perfil'

export default User
