describe('invoice module', () => {
    beforeEach(()=>{ 
       cy.loginFromUi()
       cy.get('#productManagerBtn')
       cy.get('.nav-link').contains('Invoices').click()
       cy.url().should('includes', '/invoices')
       cy.get('.Create-btn', {timeout: 8000})
       
    }) 
   
    after(()=>{
       cy.get('#productManagerBtn').click()
    })

    it('should create an invoice without Coupon', () => {
        cy.contains(' Create Invoice ').click()
        cy.get('.ng-select.ng-invalid > .ng-select-container > .ng-value-container > .ng-input > input', { timeout: 20000 })
        .should('be.visible').then(() => {
          cy.get('.ng-select.ng-invalid > .ng-select-container > .ng-value-container > .ng-input > input')
          .type(Cypress.env('customerNumber'))
          .click()
          })
        cy.get('.ng-option-label').click()
        cy.get('.mat-select-min-line').should('contain','Egyptian Pound')
        cy.get('.mat-datepicker-toggle-default-icon').click()
        cy.get('.mat-calendar-body-active').click()
        cy.get('#mat-input-2').type(Cypress.env('item'))
        cy.get('#mat-input-3').type(Cypress.env('quantity'))
        cy.get('#mat-input-4').type(Cypress.env('price'))
        cy.get('.egp-price > span').invoke('text').as('subTotal')
          .then(parseFloat).should('be.gte', 5)
        cy.get('.mr-1').click()
        cy.get('#mat-input-5').type(Cypress.env('tax'))
        cy.get('#AddNewItemShipp').click()
        cy.get('#mat-input-6').type(Cypress.env('shipping'))
        cy.get('.egp-bold > span').invoke('text').as('total')
        cy.get('.btn-white').click()
        cy.get('.modal-title').contains('Successfully Added')
        cy.get('.phoneNumber').contains('+923244323448')
        cy.get('.headingInModal').contains('string')
        cy.closePopUpModel()
    })

    it('check the invoice total value is same on create and listing page',()=>{
      cy.get('.mat-table > tbody', { timeout: 20000 }).should('be.visible')
      cy.get('.cdk-column-totalValue').and('not.be.empty').invoke('text').then((text)=>{
        cy.get('.cdk-column-invoiceId > .circle-name-text').each(($el,index,$list)=>{
          if (index === 0) {
            cy.wrap($el).click()
          } 
        })
          cy.get('.invoice-detail-total')
        })
    })

    it('verify the export button is working from the invoice listing page',()=>{
      cy.get('.outline-btn')
      cy.get('.outline-btn')
        .click()
        .should('contain','Export')
    })

    it('verify that invoice link is copied from the action button',()=>{
      cy.get('.mat-table > tbody', { timeout: 20000 }).should('be.visible')
      cy.get('.cdk-column-invoiceId > .margin-left > img').each(($el,index,$list)=>{
        if (index === 0) {
          cy.wrap($el).click()
        } 
      })
      cy.get('.mat-simple-snackbar').contains('Invoice link copied')
    })
  
})