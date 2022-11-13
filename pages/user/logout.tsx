import Jumbotron from 'components/organisms/Jumbotron'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

const Logout: NextPage = () => {
	const jumbotronProps = {
		title: {
			text: 'Saindo...',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
		subtitle: {
			text: 'Obrigado por usar nossa aplicação :)',
			className: 'tw-text-white tw-mb-2',
		},
	}

	useEffect(() => {
		signOut({ callbackUrl: '/' })
	}, [])

	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<Jumbotron
				title={jumbotronProps.title}
				subtitle={jumbotronProps.subtitle}
				className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 lg:tw-px-8 tw-py-12 tw-w-11/12 lg:tw-w-2/3 tw-mx-auto lg:tw-ml-16 tw-my-auto"
			/>
		</main>
	)
}

Logout.displayName = 'Sair'

export default Logout
