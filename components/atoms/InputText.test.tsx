import { render, screen } from '@testing-library/react'
import InputText from 'components/atoms/InputText'
import { mockInputFieldAttrs } from 'helpers/mock'
import '@testing-library/jest-dom'

const inputAttrsList = [
	mockInputFieldAttrs(),
	mockInputFieldAttrs(),
	mockInputFieldAttrs(),
	mockInputFieldAttrs(),
	mockInputFieldAttrs(),
]

describe('InputText', () => {
	for (const inputAttrs of inputAttrsList) {
		it(`Renders an input text field with id ${inputAttrs.id}, label ${inputAttrs.label}, type ${inputAttrs.type} and value ${inputAttrs.value}`, () => {
			render(<InputText {...inputAttrs} />)

			expect(screen.getByDisplayValue(inputAttrs.value)).toBeInTheDocument()
		})
	}
})
