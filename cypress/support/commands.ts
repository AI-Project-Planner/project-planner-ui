/// <reference types="cypress" />

Cypress.Commands.add('loadHomepage', () => {
  return cy.visit('http://localhost:3000/')
  .intercept(
    "GET",
    "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
    {
      statusCode: 200,
      fixture: 'savedProjects'
    }
  )
});

Cypress.Commands.add('stubSingleFetch', (endpoints, fixture, status) => {
  cy.intercept('GET', `https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/${endpoints}`, {
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

Cypress.Commands.add('completeForm', () => {
  cy.get(':nth-child(1) > .form-type-text').click()
  .get('.form-button').click()
  .get('.form-input').type('react')
  .get('.form-tech-input-container > .form-icon').click()
  .get('.form-button').click()
  .get('input.form-input').type('1')
  .get('.form-button').click()
  .get('input.form-input').type('1')
})