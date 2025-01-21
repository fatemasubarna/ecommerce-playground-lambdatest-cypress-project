describe('Search Page', () => {
    beforeEach(() => {
      // Visit the search page
      cy.visit('https://ecommerce-playground.lambdatest.io'); // Replace with your search page URL
    });


    // Basic Search Functionality
    it('Should return products matching the search term', () => {
      cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('iMac{enter}') // Enter the search term
    cy.get('.product-grid').should('exist'); // Check if product grid exists
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0); // Ensure products are displayed
  });

//Should display a no results message for an invalid search term
it('Should display a no results message for an invalid search term', () => {
  cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('InvalidSearchTerm123{enter}'); // Enter an invalid search term
  cy.get('.product-grid').should('not.exist'); // Ensure no products are displayed
  cy.contains('There is no product that matches the search criteria').should('exist');
});

// search with special character
  it('Should handle special characters gracefully', () => {
      cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('!@#$%^&*()_+{enter}'); // Enter special characters
      cy.get('.product-grid').should('not.exist'); // Ensure no products are displayed
      cy.contains('There is no product that matches the search criteria').should('exist');
  });

// case sencitivity on search
  it('Should return the same results for case sencitivity', () => {
  cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('laptop{enter}'); // Lowercase
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
    cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('LAPTOP{enter}'); // Uppercase
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
  });

// Search and Pagination
  it('Should display multiple pages of results and allow navigation between page for search pagination', () => {
    cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('i{enter}');
    cy.get('.product-grid').should('exist');
    cy.get('.pagination a').contains('2').click(); // Navigate to page 2
    cy.url().should('include', 'page=2'); // Verify URL update
    cy.get('.product-grid .product-thumb').should('exist');
  });

// Empty search
  it('Should display all products when the search is empty', () => {
      cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('{enter}'); // Submit without entering a term
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0); // Ensure all products are displayed
  });

// serach with partial word
  it('Should return products that partially match the search term', () => {
      cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('Mac{enter}'); // Partial search term
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0); // Ensure partial matches are displayed
  });


// search all category data and filter   
it('search all category and filter data',() =>{
  cy.get('.type-text').click()
  // Navigate to a specific category (e.g., "all category")
  cy.get('.product-grid').should('exist');
  cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);

// filter
  cy.get('#entry_212462 > .icon-left').click()
  cy.get('#mz-filter-panel-1-1 > .mz-filter-group-content > :nth-child(1) > .custom-control').should('be.visible')
  cy.wait(500)
  cy.get('input[type="checkbox"][value="9"]').check({force: true});
  // check after filter data should be filtered
  cy.get('.product-grid').should('exist'); // Check if product grid exists
  cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
  cy.get('#mz-filter-panel-1-1 >') // Replace with the selector showing the filter product count
            .invoke('text')
            .then((badgeCountText) => {
              const badgeCount = parseInt(badgeCountText.trim(), 20);

              // Get the product list and verify its length matches the badge count
              cy.get('.product-layout') // Replace with the selector for product list items
                  .should('have.length', badgeCount);
          });


  //cy.get('#mz-filter-panel-1-1 :checked').should('be.checked').and('have.value', '8')// find checked option.
  //cy.get('input[type="checkbox"][value="8"]').uncheck({force: true});

});

})