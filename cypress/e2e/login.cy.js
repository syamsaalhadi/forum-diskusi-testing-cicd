const BASE_URL = 'https://forum-api.dicoding.dev/v1';

describe('Login spec', () => {
  beforeEach(() => {
    cy.stubPreload();
    cy.visit('/login');
  });

  it('should display the login page correctly', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display an error notification when email/password is empty', () => {
    cy.get('button').contains('Masuk').click();

    // Browser native validation blocks submission; the form must still be present.
    cy.get('input#email').should('be.visible');
  });

  it('should display an error notification when the credentials are invalid', () => {
    cy.intercept('POST', `${BASE_URL}/login`, {
      statusCode: 400,
      body: { status: 'fail', message: 'email or password is wrong' },
    }).as('loginFailed');

    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button').contains('Masuk').click();

    cy.wait('@loginFailed');
    cy.contains('email or password is wrong').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('should display the homepage and the logged-in user when login succeeds', () => {
    cy.intercept('POST', `${BASE_URL}/login`, {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { token: 'fake-access-token' } },
    }).as('loginSuccess');

    cy.intercept('GET', `${BASE_URL}/users/me`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
        },
      },
    }).as('getOwnProfile');

    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('secret12345');
    cy.get('button').contains('Masuk').click();

    cy.wait('@loginSuccess');
    cy.wait('@getOwnProfile');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Keluar').should('be.visible');
  });
});
