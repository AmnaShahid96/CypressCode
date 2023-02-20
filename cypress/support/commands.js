Cypress.Commands.add('loginFromUi', () => {
     cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type(Cypress.env('merchantNumber'))
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth')
      cy.get('.password-field').type(Cypress.env('password'))
      cy.contains('Get Started').click()

})

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
        }).then(response =>{
            const value = response.body.data.token;
            return value;
    }) 
})

Cypress.Commands.add('logout', () => {
    localStorage.removeItem('CIRCLE_PAY_JWT_TOKEN');
    cy.visit('/')
})

Cypress.Commands.add('closePopUpModel',()=>{
    cy.get('.modal-dialog')  
    .should('be.visible')
    .find('.modal-header')
    .find('button[type="button"]')      
              .should('contain', '×')                
    .click()
})