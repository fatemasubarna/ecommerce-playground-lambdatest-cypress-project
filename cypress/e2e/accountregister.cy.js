describe('register functionality', () => {
    const firstName = "Demo";
    const lastName = "Customer";
    const invalidEmail = "asdf";
    const validEmail = "validuser@gmail.com";
    const invalidTelephonenumber = "684577"
    const validTelephoneNumber = "+8801122334499"
    const invalidPassword = "123";
    const validPassword = "12345678";
    const matchedPassword = "12345678"
    const notmatchedPassword = "12345679"

    beforeEach(() => {
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

})

it('register without any data', () => {
    cy.get('.float-right > .btn').click();
    //proper message show in register form
    cy.get('#account-register > .alert').should('be.visible')
      .and('contain', 'Warning: You must agree to the Privacy Policy!');

      cy.get(':nth-child(3) > .col-sm-10 > .text-danger').should('be.visible')
      .and('contain', 'First Name must be between 1 and 32 characters!');

      cy.get(':nth-child(4) > .col-sm-10 > .text-danger').should('be.visible')
      .and('contain', 'Last Name must be between 1 and 32 characters!');

      cy.get(':nth-child(5) > .col-sm-10 > .text-danger').should('be.visible')
      .and('contain', 'E-Mail Address does not appear to be valid!');

      cy.get(':nth-child(6) > .col-sm-10 > .text-danger').should('be.visible')
      .and('contain', 'Telephone must be between 3 and 32 characters!');

      cy.get(':nth-child(2) > .col-sm-10 > .text-danger').should('be.visible')
      .and('contain', 'Password must be between 4 and 20 characters!');

})
it('register with invalid email format', () => {
cy.get('#input-firstname').type(firstName);
cy.get('#input-lastname').type(lastName);
cy.get('#input-email').type(invalidEmail);
cy.get('#input-telephone').type(validTelephoneNumber);
cy.get('#input-password').type(validPassword);
cy.get('#input-confirm').type(validPassword);
cy.get('.float-right > .custom-control > .custom-control-label').click();
cy.get('.float-right > .btn').click();
})
})