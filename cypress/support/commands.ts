/// <reference types="cypress" />

Cypress.Commands.add('loadHomepage', () => {
  return cy.visit('http://localhost:3000/form')
  .intercept(
    "GET",
    "https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects",
    {
      statusCode: 200,
      fixture: 'savedProjects'
    }
  )
});

Cypress.Commands.add('stubSingleFetch', (endpoints, fixture, status) => {
  cy.intercept('GET', `https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/${endpoints}`, {
    statusCode: status, 
    fixture: fixture
  }).as(fixture)
})

Cypress.Commands.add('checkBadRoute', (route) => {
  cy.visit(`http://localhost:3000${route}nonsense`)
  .get('h1').contains('Oops! There\'s nothing to see here!')
  .get('.empty-page > img').should('be.visible')
  .get('a[href="/"').contains('Take Me Back!').click()
  .url().should('eq', 'http://localhost:3000/')
})
