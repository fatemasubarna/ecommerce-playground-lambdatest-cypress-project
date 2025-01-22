import ValidSearch from "../pages/validsearch";
describe('Search Page', () => {
  const validsearch = new ValidSearch();
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
  cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').type('iPhone{enter}'); // Lowercase
    cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
    cy.get('#entry_217822 > .search-wrapper > form > #search > .search-input-group > .search-input > .flex-fill > input').clear().type('IPHONE{enter}'); // Uppercase
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


// search all category data and select single checkbox filter   
it('search all category and single checkbox click filter data',() =>{
  validsearch.ValidSearch();
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
// search all category data and select multiple checkbox filter   
it('search all category and multiple checkbox click filter data',() =>{
  validsearch.ValidSearch();
  cy.get('#entry_212462 > .icon-left').click()
  cy.wait(500)
  cy.get('input[type="checkbox"]').check({force: true});
  // check after filter data should be filtered
  cy.get('.product-grid').should('exist'); // Check if product grid exists
  cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
});
// search all category data and select first checkbox  on filter   
it('search all category and first checkbox click filter data',() =>{
  validsearch.ValidSearch();
  cy.get('#entry_212462 > .icon-left').click()
  cy.wait(500)
  cy.get('input[type="checkbox"]').first().check({force: true});
  // check after filter data should be filtered
  cy.get('.product-grid').should('exist'); // Check if product grid exists
  cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
});

// search all category data and select last checkbox  on filter   
it('search all category and last checkbox click filter data',() =>{
  validsearch.ValidSearch();
  cy.get('#entry_212462 > .icon-left').click()
  cy.wait(500)
  cy.get('input[type="checkbox"]').last().check({force: true});
  // check after filter data should be filtered
  cy.get('.product-grid').should('exist'); // Check if product grid exists
  cy.get('.product-grid .product-thumb').should('have.length.greaterThan', 0);
});

// Display products matching multiple applied filters
it('should display products matching multiple applied filters', () => {
  validsearch.ValidSearch();
  cy.get('#entry_212462 > .icon-left').click()
  cy.wait(500)
  cy.get('input[type="checkbox"][value="9"]').check({force: true});// Apply category filter
  cy.get('#mz-filter-panel-1-0 > .mz-filter-group-content > .d-flex > [name="mz_fp[min]"]').clear().type(10);
  cy.get('#mz-filter-panel-1-0 > .mz-filter-group-content > .d-flex > [name="mz_fp[max]"]').clear().type(1000); // Apply price range filter
  cy.get('.product-layout').should('exist');
  cy.get('.product-thumb').each(($product) => {
    cy.wrap($product).find('.price').invoke('text').then((priceText) => {
      const price = parseFloat(priceText.replace('$', '')); // Adjust based on currency
      expect(price).to.be.gte(1000).and.lte(10); // Assert price is in the specified range
    });
  })
});

})