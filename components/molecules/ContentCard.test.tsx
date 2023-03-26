import { render, screen } from '@testing-library/react'
import ContentCard from 'components/molecules/ContentCard'
import { mockRandomSentence } from 'helpers/mock'
import '@testing-library/jest-dom'

const titles = [
	mockRandomSentence(true),
	mockRandomSentence(true),
	mockRandomSentence(true),
	mockRandomSentence(true),
	mockRandomSentence(true),
] as { text: string }[]

describe('ContentCard', () => {
	for (const title of titles) {
		it(`Renders a content card with title: ${title.text}`, () => {
			render(<ContentCard title={title} />)

			const HTMLTitle = screen.getByText(title.text, { exact: false })

			expect(HTMLTitle).toBeInTheDocument()
		})
	}
})
