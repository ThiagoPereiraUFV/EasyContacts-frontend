import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Jumbotron from '../components/organisms/Jumbotron'

const Home: NextPage = () => {
	const router = useRouter()
	const { data: session } = useSession()
	const jumbotronProps = {
		title: {
			text: 'EasyContacts',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
		subtitle: {
			text: 'O seu gerenciador de contatos',
			className: 'tw-text-white tw-mb-2',
		},
		body: {
			text: 'Armazene seus contatos e leve-os para qualquer lugar com o EasyContacts. Abra agora uma conta e sincronize todos os seus contatos de forma rápida e gratuita.',
			className: 'tw-text-white tw-font-bold',
		},
		button: {
			label: session?.user?.id ? 'Ver meus contatos' : 'Acessar conta',
			onClick: () =>
				router.push(session?.user?.id ? '/contacts' : '/user/login'),
			className: '',
		},
	}

	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<Jumbotron
				title={jumbotronProps.title}
				subtitle={jumbotronProps.subtitle}
				body={jumbotronProps.body}
				button={jumbotronProps.button}
				className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 lg:tw-px-8 tw-py-12 tw-w-11/12 lg:tw-w-2/3 tw-mx-auto lg:tw-ml-16 tw-my-auto"
			/>
		</main>
	)
}

export default Home
