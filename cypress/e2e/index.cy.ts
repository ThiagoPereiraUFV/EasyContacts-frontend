describe('Homepage tests', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('Should access the home page', () => {
		cy.contains('div', 'EasyContacts')
	})

	it('Should access the login page', () => {
		cy.get('button').contains('Acessar conta').click()
		cy.url().should('contain', '/user/login')
		cy.contains('div', 'Acesse sua conta')
	})
})
