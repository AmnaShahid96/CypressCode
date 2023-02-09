// const cypress = require("cypress")

describe('invoice module', () => {

    env: {
      username: ""
    }
    beforeEach(()=>{
    
       // cy.loginWithApi()
       // cy.visit(Cypress.env('baseUrl'))
       
       cy.loginFromUi()
       cy.get('#productManagerBtn')
       cy.get(':nth-child(3) > .nav-link').click()
       cy.url().should('includes', '/invoices')
       cy.get('.Create-btn')
       cy.wait(4000)
        
    }) 
   
    
    after(()=>{
       // logout from UI
       // cy.get('#productManagerBtn').click()

       // logout by removing the token from local storage
       //cy.logout() 
      

    })

    // test Case:1 create an invoice wihtout a coupon
    it('should create an invoice', () => {
  
       
       
        cy.contains(' Create Invoice ').click()

        // wait to load the complete objects on the page
        cy.wait(10000)
        
        // select a customer
        cy.get(':nth-child(1) > .row > .col-xl-8 > .payment-value > .ng-select > .ng-select-container').type('+923244323448').click()
        cy.get('.ng-option-label').click()

        // checking the currency field has a value=Egyption Pound 
        cy.get('.mat-select-min-line').should('contain','Egyptian Pound')
        
        // selecting a data from the calender
        cy.get('.mat-datepicker-toggle-default-icon').click()
       // cy.get('.mat-calendar-body > .ng-star-inserted > .mat-calendar-body-active').click()
       
       cy.get('#mat-input-1').then(($date) => {
          
          const selectedDate = $date
        
          cy.get('.mat-calendar-body > .ng-star-inserted > .mat-calendar-body-active')
            .click()
            .then(() => {
              const selectingDate = $date
              
              // make sure it's what we expected
              expect(selectingDate).to.eq(selectedDate)
          
            })
            
        })
        


        // adding item name

        cy.get('#mat-input-2').type('Item')
        cy.get('#mat-input-2').should('have.value', 'Item').and('be.visible')

        // adding quantity
        cy.get('#mat-input-3').type('1').should('be.visible')
        

        // adding price
        cy.get('#mat-input-4').type(5).should('be.visible')
        
        // subTotal
        cy.get(':nth-child(6) > .col-md-2 > .text-right > span').invoke('text').as('subTotal').then(parseFloat).should('be.gte', 5)

        // adding tax
        cy.get('.mr-1').click()
        cy.get('#mat-input-5').type('10').should('be.visible')

        // adding shipping
        cy.get('#AddNewItemShipp').click()
        cy.get('#mat-input-6').type(5).should('be.visible')


        // saving the total amount
        cy.get(':nth-child(11) > .col-md-2 > .text-right > span').invoke('text').as('total')

        cy.get('.btn-white').click()
        cy.wait(5000)

        // to Check the details on the popup
        cy.get('.modal-title').contains('Successfully Added')

        cy.get('.phoneNumber').then(($el) => {
            $el.get('+923244323448')
          })
          cy.get('.headingInModal').then(($el) => {
            $el.get('string')
          })
          


    })

    // test Case #2: Checking the pop with Correct Details

    it('check the invoice total value on create and listing page',()=>{
        

        cy.get('table > tbody > :nth-child(1) > .cdk-column-totalValue').and('not.be.empty').then(($price) => {
          // capture what num is right now
          const lsitingTotalValue = parseFloat($price.text())
        
          cy.get(':nth-child(1) > .cdk-column-invoiceId > .circle-name-text')
            .click()
            .then(() => {
              // now capture it again
              const detailsTotalValue = parseFloat($price.text())
        
              // make sure it's what we expected
              expect(detailsTotalValue).to.eq(lsitingTotalValue)
            })
            
        })
        
    })

    // test Case #3: Verify the Export button is working

    it('verify the export button is working',()=>{
     
      cy.get('.outline-btn')
      cy.get('.outline-btn')
      .click()
      .should('contain','Export')
    })

    // test Case #4: Verify the action copy button is working

    it.only('verify that invoice link is copied',()=>{
      cy.wait(5000)
      cy.get(':nth-child(1) > .cdk-column-invoiceId > .margin-left > img').click()
      cy.get('.mat-simple-snackbar').contains('Invoice link copied')
      
    })
    

  })

