describe('product card', () => {
    beforeEach(() => {
      // Visit the search page
      cy.visit('https://ecommerce-playground.lambdatest.io'); // Replace with your search page URL
    });

    it('card hover', () => { 
       // hover a product and shows that info are showing properly
       cy.get('#mz-product-listing-image-37217979-0-0 > .carousel-inner > .active > .lazy-load').trigger('mouseover').should('be.visible');
       //cy.get('#mz-product-listing-image-37217979-0-0 > .carousel-inner > .active > .lazy-load').invoke('show')
       cy.wait(600);
       cy.contains('Add to Wish List')
       cy.contains('Add to Cart')
       cy.contains('Compare this Product')
       cy.contains('Quick view')
       
       //cy.get('#mz-product-listing-image-37217979-0-0 > .carousel-inner > .active > .lazy-load').find('button.btn.btn-wishlist.wishlist-107').should('be.visible')
    });
});