const BASE_URL = 'https://forum-api.dicoding.dev/v1';

/**
 * Stubs the network requests fired on every app load (asyncPreloadProcess):
 * - GET /users
 * - GET /threads
 * - GET /users/me (only relevant when an access token already exists)
 * This keeps the E2E tests deterministic and independent from the real backend.
 */
Cypress.Commands.add('stubPreload', () => {
  cy.intercept('GET', `${BASE_URL}/users`, {
    statusCode: 200,
    body: { status: 'success', message: 'ok', data: { users: [] } },
  }).as('getUsers');

  cy.intercept('GET', `${BASE_URL}/threads`, {
    statusCode: 200,
    body: { status: 'success', message: 'ok', data: { threads: [] } },
  }).as('getThreads');
});

export {};
