import { render, screen } from '@testing-library/react'
import Jumbotron from 'components/organisms/Jumbotron'
import '@testing-library/jest-dom'
import { mockJumbotronProps } from 'helpers/mock'

const jumbotronProps = [
	mockJumbotronProps(),
	mockJumbotronProps(),
	mockJumbotronProps(),
	mockJumbotronProps(),
	mockJumbotronProps(),
]

describe('Jumbotron', () => {
	for (const props of jumbotronProps) {
		it(`Renders a Jumbotron with title: ${props.title.text}; subtitle: ${props.subtitle.text}; body: ${props.body.text}; and button label: ${props.button.label}`, () => {
			render(
				<Jumbotron
					title={props.title}
					subtitle={props.subtitle}
					body={props.body}
					button={props.button}
				/>
			)

			const title = screen.getByText(props.title.text)
			const subtitle = screen.getByText(props.subtitle.text)
			const body = screen.getByText(props.body.text)
			const button = screen.getByText(props.button.label)

			expect(title).toBeInTheDocument()
			expect(subtitle).toBeInTheDocument()
			expect(body).toBeInTheDocument()
			expect(button).toBeInTheDocument()
		})
	}
})
