import ValidLogin from "../pages/ValidLogin";

describe('login functionality', () => {
  //Define reusable test data
  const validEmail = 'test1122@gmail.com';
  const validPassword = '12345678';
  const invalidEmail = 'invaliduser@example.com';
  const invalidPassword = 'WrongPassword';
  const loginPage = new ValidLogin();
  
  beforeEach(() => {
    cy.visit('https://ecommerce-playground.lambdatest.io')
    cy.get('#widget-navbar-217834 > .navbar-nav > :nth-child(6) > .nav-link > .info > .title').trigger('mouseover');
    cy.get('.mz-sub-menu-96 > :nth-child(1) > .icon-left > .info > .title').should('be.visible');
    cy.get('.mz-sub-menu-96 > :nth-child(1) > .icon-left > .info > .title').click();
    // Visit the login page before each test
})

  it('invalid login', () => {
    // login with invlid password and invalid email
    cy.get('#input-email').type(invalidEmail);
    cy.get('#input-password').type(invalidPassword);
    cy.get('form > .btn').click();
     // Assert that the error message appears
    cy.get('#account-login > .alert').should('be.visible')
    .and('contain', 'Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.'); 

  })
  it('invalid login', () => {
    // login with valid email and invalid password
    cy.get('#input-email').type(validEmail);
    cy.get('#input-password').type(invalidPassword);
    cy.get('form > .btn').click();
    // Assert that the error message appears
    cy.get('#account-login > .alert').should('be.visible')
    .and('contain', 'No match for E-Mail Address and/or Password.'); 
  })

  it('invalid login', () => {
    // login with invalid email and valid password.
    cy.get('#input-email').type(invalidEmail);
    cy.get('#input-password').type(validPassword);
    cy.get('form > .btn').click();
    // Assert that the error message appears
    cy.get('#account-login > .alert').should('be.visible')
    .and('contain', 'No match for E-Mail Address and/or Password.'); 

  })
  it('valid login', () => {
    loginPage.ValidUserLogin();
    
    
  })
})


