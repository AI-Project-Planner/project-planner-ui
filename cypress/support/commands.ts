/// <reference types="cypress" />

Cypress.Commands.add('loadHomepage', () => {
  return cy.visit('http://localhost:3000/')
  .get('[src="/static/media/person1.e82800b7bd3a81edd244.png"]').click()
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
  if  (route === '/saved/') {
    cy.get('[src="/static/media/person1.e82800b7bd3a81edd244.png"]').click()
  } 
    cy.get('h1').contains('Oops! There\'s nothing to see here!')
    .get('.empty-page > img').should('be.visible')
    .get('a[href="/"').contains('Take Me Back!').click()
    .url().should('eq', 'http://localhost:3000/')
  
})

Cypress.Commands.add('completeForm', () => {
  cy.get(':nth-child(1) > .form-type-text').click()
  .get('.form-button').click()
  .get('.form-input').type('react')
  .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
  .get('.form-button').click()
  .get('input.form-input').type('1')
  .get('.form-button').click()
  .get('input.form-input').type('1')
})