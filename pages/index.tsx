import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Jumbotron from '../components/organisms/Jumbotron'

const Home: NextPage = () => {
	const router = useRouter()
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
			label: 'Acessar conta',
			onClick: () => router.push('/user/login'),
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
				className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-8 tw-py-12 tw-w-2/3 tw-ml-16 tw-my-auto"
			/>
		</main>
	)
}

export default Home
