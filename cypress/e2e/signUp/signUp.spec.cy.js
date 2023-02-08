describe('Login', () => {
    it('SignUp with valid number', () => {
      cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type('+923001231231').should('have.value','3001231231')
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth/signup/')
      // if the number is not registered, display the signup screen
    }) 
})