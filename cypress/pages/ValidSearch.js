class ValidSearch{
    ValidSearch(){
        cy.visit('https://ecommerce-playground.lambdatest.io')
            cy.get('.type-text').click()
            // Navigate to a specific category (e.g., "all category")
            cy.get('.product-grid').should('exist');
            cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
    }
}
export default ValidSearch;