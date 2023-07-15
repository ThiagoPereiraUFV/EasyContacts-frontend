describe('Login page tests', () => {
	beforeEach(() => {
		cy.visit('/user/login')
	})

	it('Should access the signup page', () => {
		cy.get('#signup-url').contains('aqui').click()
		cy.url().should('contain', '/user/signup')
		cy.contains('div', 'Abra sua conta')
	})

	// it('Should access the login page', () => {
	// 	cy.get('button').contains('Acessar conta').click()
	// 	cy.url().should('contain', '/user/login')
	// })
})
