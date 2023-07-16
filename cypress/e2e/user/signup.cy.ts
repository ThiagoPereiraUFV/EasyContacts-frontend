describe('Signup page tests', () => {
	beforeEach(() => {
		cy.visit('/user/signup')
	})

	it('Should access the login page', () => {
		cy.get('#login-url').contains('aqui').click()
		cy.url().should('contain', '/user/login')
		cy.contains('div', 'Acesse sua conta')
	})

	// it('Should access the login page', () => {
	// 	cy.get('button').contains('Acessar conta').click()
	// 	cy.url().should('contain', '/user/login')
	// })
})

export {}
