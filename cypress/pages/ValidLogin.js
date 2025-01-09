class ValidLogin{
    ValidUserLogin(){
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
        cy.get('#input-email').type('test1122@gmail.com');
        cy.get('#input-password').type('12345678');
        cy.get('form > .btn').click();
        cy.wait(100);
        cy.url('https://ecommerce-playground.lambdatest.io/index.php?route=account/account').should('include', 'account'); 
        cy.contains('My Account').should('be.visible');
    }
}
export default ValidLogin;