

Cypress.Commands.add('loginFromUi', () => {
    // login With UI
     cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type('+923244323448').should('have.value','3244323448')
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth')
      cy.get('.password-field').type('Admin125!@%')
      cy.contains('Get Started').click()
     
      cy.setCookie('CIRCLE_PAY_JWT_TOKEN', 'res.body.data.token')
})



// login with API
Cypress.Commands.add('loginWithApi',()=>{
    cy.request({
        url:'https://staging.dashboard.apicirclepay.com/users/login',
        method:'POST',
        body: {
            mobile: "+923244323448",
             otp: "", 
             email: "", 
             password:  "Admin125!@%", 
             confirmPassword: ""
            },
        
            failOnStatusCode: false,
}).then(res =>{
     localStorage.setItem('CIRCLE_PAY_JWT_TOKEN', res.body.data.token)}
)  
})



Cypress.Commands.add('logout', () => {
    //cy.window().its('localStorage').invoke('removeItem', 'session')
    localStorage.removeItem('CIRCLE_PAY_JWT_TOKEN');
    cy.visit('/')
})