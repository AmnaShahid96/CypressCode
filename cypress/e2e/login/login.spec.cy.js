describe('Login', () => {
    it('Login with valid phone number', () => {
      cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type('+923244323448').should('have.value','3244323448')
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth')
      cy.get('.password-field').type('Admin125!@%')
      cy.contains('Get Started').click()
    })
  })