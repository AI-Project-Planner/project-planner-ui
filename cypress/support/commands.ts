/// <reference types="cypress" />

Cypress.Commands.add('loadHomepage', () => {
  return cy.visit('http://localhost:3000/form')
  .intercept(
    "GET",
    "https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects",
    {
      statusCode: 200,
      body: { },
      //what is this request getting?? come back and fill out later once we have real data
    }
  )
});