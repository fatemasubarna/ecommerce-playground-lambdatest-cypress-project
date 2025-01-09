import ValidLogin from "../pages/ValidLogin";

describe('edit account', () => {
    const loginPage = new ValidLogin();
    beforeEach(() => {
        loginPage.ValidUserLogin();
        
    }
)
  it("edit account information",()=>{
    cy.get(':nth-child(1) > .card-body > .row > :nth-child(1) > .d-inline-flex').click();
    cy.wait(60);
    cy.get('#input-firstname').type('active')
    cy.get('#input-lastname').type('customer')


  })  


})