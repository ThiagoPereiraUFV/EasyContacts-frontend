import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Jumbotron from '../components/organisms/Jumbotron'

const NotFound: NextPage = () => {
	const router = useRouter()
	const jumbotronProps = {
		title: {
			text: 'Erro 404',
			className: 'tw-font-normal tw-text-white tw-mb-4',
		},
		subtitle: {
			text: 'A página que você procura não foi encontrada.',
			className: 'tw-text-white tw-mb-2',
		},
		button: {
			label: 'Voltar para o início',
			onClick: () => router.push('/'),
			className: '',
		},
	}

	return (
		<main className="tw-flex tw-py-4 tw-row-span-8">
			<Jumbotron
				title={jumbotronProps.title}
				subtitle={jumbotronProps.subtitle}
				button={jumbotronProps.button}
				className="tw-bg-purpleTransparent tw-rounded-3xl tw-px-4 lg:tw-px-8 tw-py-12 tw-w-11/12 lg:tw-w-2/3 tw-mx-auto lg:tw-ml-16 tw-my-auto"
			/>
		</main>
	)
}

export default NotFound
