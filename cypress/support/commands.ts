/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


declare namespace Cypress {
  interface Chainable {
    stubSingleFetch(endpoints:string, fixture:string, status:number):Chainable<JQuery<HTMLElement>>
    checkBadRoute(path: string): Chainable<JQuery<HTMLElement>>
  }
}


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