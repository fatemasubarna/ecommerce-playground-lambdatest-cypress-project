import ValidLogin from "../pages/ValidLogin"; 

describe('Menu', () => {
    const loginPage = new ValidLogin();

    beforeEach(() => {
        loginPage.ValidUserLogin();  
   });

it("Menu page title",()=>{
    // should have shown title of menu section
    cy.title().should('eq', 'My Account'); 
});

it('should have all the menu items', () => {
    const menuItems = [
        'Edit Account',
        'Password',
        'Address Book',
        'Wish List',
        'Order History',
        'Downloads',
        'Recurring payments',
        'Transactions',
        'Newsletter',
        'Reward Points',
        'Register for an affiliate account'
      ];
    menuItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });
    
// Test the navigation to each section of the account page when a menu item is clicked
it('should navigate to the correct account section', () => {

    // Verify navigation for each menu item
    cy.contains('Edit your account information').click();
    cy.url().should('include', 'route=account/edit');
    cy.contains('My Account Information').should('be.visible');
    cy.go('back');

    cy.contains('Change your password').click();
    cy.url().should('include', 'route=account/password');
    cy.contains('Change Password').should('be.visible');
    cy.go('back');

    cy.contains('Modify your address book entries').click();
    cy.url().should('include', 'route=account/address');
    cy.contains('Address Book Entries').should('be.visible');
    cy.go('back');

    cy.contains('Modify your wish list').click();
    cy.url().should('include', 'route=account/wishlist');
    cy.contains('My Wish List').should('be.visible');
    cy.go('back');

    cy.contains('Subscribe / unsubscribe to newsletter').click();
    cy.url().should('include', 'route=account/newsletter');
    cy.contains('Newsletter Subscription').should('be.visible');
    cy.go('back');

    cy.contains('View your order history').click();
    cy.url().should('include', 'route=account/order');
    cy.contains('Order History').should('be.visible');
    cy.go('back');

    cy.contains('Downloads').click();
    cy.url().should('include', 'route=account/download');
    cy.contains('Account Downloads').should('be.visible');
    cy.go('back');

    cy.contains('Your Reward Points').click();
    cy.url().should('include', 'route=account/reward');
    cy.contains('Your Reward Points').should('be.visible');
    cy.go('back');

    cy.contains('View your return request').click();
    cy.url().should('include', 'route=account/return');
    cy.contains('Product Returns').should('be.visible');
    cy.go('back');

    cy.contains('Your Transactions').click();
    cy.url().should('include', 'route=account/transaction');
    cy.contains('Your Transactions').should('be.visible');
    cy.go('back');

    cy.contains('Recurring payments').click();
    cy.url().should('include', 'route=account/recurring');
    cy.contains('Recurring Payments').should('be.visible');
    cy.go('back');

    cy.contains('Register for an affiliate account').click();
    cy.url().should('include', 'route=account/affiliate/add');
    cy.contains('Your Affiliate Information').should('be.visible');
    
  });

  it('should have a responsive design', () => {
    // Test for responsiveness in smaller viewports
    cy.viewport(375, 667); // Example for iPhone 6/7/8
    cy.get('.list-group') // Ensure the menu list is visible in a small screen
      .should('be.visible');
  });

  it('should not navigate when a disabled menu item is clicked', () => {
    // Simulate clicking on a disabled menu item
    cy.get('.menu .menu-item.disabled').click();
  
    // Verify that the page does not navigate
    cy.url().should('eq', Cypress.config('baseUrl') + '/index.php?route=account/account'); // Verify URL stays the same
  });
  it('Find all broken links', () => {
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        })
        cy.log( link.prop('href'))
      })
    })
  
  }); 
